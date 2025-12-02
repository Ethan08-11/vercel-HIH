// 加载环境变量（本地开发）
if (require.main === module && !process.env.VERCEL) {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 提供静态文件服务（必须在所有路由之前）
// 使用 express.static 处理所有静态文件
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        // 为不同文件类型设置正确的 Content-Type
        if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
    },
    index: false // 不自动提供 index.html，由路由处理
}));

// 确保 Picture 目录可访问
app.use('/Picture', express.static(path.join(__dirname, 'Picture'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
    }
}));

console.log('静态文件服务已配置');
console.log('根目录:', __dirname);
console.log('Picture 目录:', path.join(__dirname, 'Picture'));

// 明确处理静态文件路由（作为备用，express.static 应该已经处理了）
app.get('/style.css', (req, res) => {
    console.log('请求 /style.css');
    res.sendFile('style.css', { root: __dirname }, (err) => {
        if (err) {
            console.error('发送 style.css 失败:', err);
            res.status(404).send('File not found');
        } else {
            console.log('style.css 发送成功');
        }
    });
});

app.get('/script.js', (req, res) => {
    console.log('请求 /script.js');
    res.sendFile('script.js', { root: __dirname }, (err) => {
        if (err) {
            console.error('发送 script.js 失败:', err);
            res.status(404).send('File not found');
        } else {
            console.log('script.js 发送成功');
        }
    });
});

// 处理图片请求
app.get('/Picture/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('请求图片:', filename);
    res.sendFile(filename, { root: path.join(__dirname, 'Picture') }, (err) => {
        if (err) {
            console.error('发送图片失败:', err);
            res.status(404).send('Image not found');
        } else {
            console.log('图片发送成功:', filename);
        }
    });
});

// 根路径返回 index.html
app.get('/', (req, res) => {
    try {
        console.log('请求根路径，发送 index.html');
        console.log('__dirname:', __dirname);
        const indexPath = path.join(__dirname, 'index.html');
        console.log('index.html 路径:', indexPath);
        res.sendFile('index.html', { root: __dirname }, (err) => {
            if (err) {
                console.error('发送 index.html 失败:', err);
                res.status(500).send('无法加载页面: ' + err.message);
            } else {
                console.log('index.html 发送成功');
            }
        });
    } catch (error) {
        console.error('发送 index.html 时出错:', error);
        res.status(500).send('无法加载页面: ' + error.message);
    }
});

// 确保所有静态资源都能正确加载
app.get('/index.html', (req, res) => {
    console.log('请求 /index.html');
    res.sendFile('index.html', { root: __dirname });
});

// 检查是否在 Vercel 环境（只读文件系统）
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

// 确保数据目录存在（仅在非 Vercel 环境）
const dataDir = path.join(__dirname, 'data');
if (!isVercel) {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// 确保产品分类目录存在（仅在非 Vercel 环境）
const productsDir = path.join(dataDir, 'products');
if (!isVercel) {
    if (!fs.existsSync(productsDir)) {
        fs.mkdirSync(productsDir, { recursive: true });
    }
}

// 提交问卷数据的API
app.post('/api/submit', async (req, res) => {
    try {
        const { answers, selectedProducts, timestamp } = req.body;
        
        // 验证数据
        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ 
                success: false, 
                message: '无效的提交数据' 
            });
        }

        const submissionId = Date.now();
        const submitTime = timestamp || new Date().toISOString();
        const submittedAt = new Date().toLocaleString('zh-CN');

        // 优先使用数据库存储
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (useDatabase) {
            // 使用 MongoDB 存储
            if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
                const savePromises = selectedProducts.map(async (product) => {
                    const productId = product.id;
                    const productName = product.name || `产品${productId}`;
                    
                    const productRecord = {
                        submissionId: submissionId,
                        productId: productId,
                        productName: productName,
                        productImage: product.image,
                        answers: answers,
                        selectedProducts: selectedProducts,
                        timestamp: submitTime,
                        submittedAt: submittedAt,
                        createdAt: new Date()
                    };
                    
                    return await db.saveSubmission(productRecord);
                });
                
                await Promise.all(savePromises);
                console.log('收到问卷提交，已按产品分类保存到数据库');
            }
            
            return res.json({
                success: true,
                message: '问卷提交成功！',
                submissionId: submissionId,
                productsCount: selectedProducts ? selectedProducts.length : 0
            });
        }

        // 如果没有配置数据库，使用文件系统（仅本地开发）
        if (isVercel) {
            return res.json({
                success: false,
                message: '错误：Vercel 环境需要配置 MongoDB 数据库。请设置 MONGODB_URI 环境变量。',
                submissionId: submissionId,
                productsCount: selectedProducts ? selectedProducts.length : 0
            });
        }

        // 本地文件系统存储（仅用于开发）
        if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
            selectedProducts.forEach(product => {
                const productId = product.id;
                const productName = product.name || `产品${productId}`;
                
                const productRecord = {
                    submissionId: submissionId,
                    productId: productId,
                    productName: productName,
                    productImage: product.image,
                    answers: answers,
                    selectedProducts: selectedProducts,
                    timestamp: submitTime,
                    submittedAt: submittedAt
                };

                const filename = `${productId}_${productName}_${submissionId}.json`;
                const filepath = path.join(dataDir, filename);
                fs.writeFileSync(filepath, JSON.stringify(productRecord, null, 2), 'utf8');
                
                const productFilepath = path.join(productsDir, filename);
                fs.writeFileSync(productFilepath, JSON.stringify(productRecord, null, 2), 'utf8');
                
                console.log(`产品 ${productName} (ID: ${productId}) 的提交已保存: ${filename}`);
            });
        }

        console.log('收到问卷提交，已按产品分类保存');

        res.json({
            success: true,
            message: '问卷提交成功！',
            submissionId: submissionId,
            productsCount: selectedProducts ? selectedProducts.length : 0
        });

    } catch (error) {
        console.error('处理提交时出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message
        });
    }
});

// 获取所有提交记录的API（可选，用于查看提交历史）
app.get('/api/submissions', async (req, res) => {
    try {
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (useDatabase) {
            const submissions = await db.getAllSubmissions();
            return res.json({
                success: true,
                count: submissions.length,
                submissions: submissions
            });
        }
        
        // 文件系统读取（仅本地开发）
        if (isVercel) {
            return res.json({
                success: true,
                count: 0,
                submissions: [],
                message: 'Vercel 环境需要配置 MongoDB 数据库'
            });
        }
        
        if (!fs.existsSync(dataDir)) {
            return res.json({
                success: true,
                count: 0,
                submissions: []
            });
        }
        
        const files = fs.readdirSync(dataDir);
        const submissions = files
            .filter(file => file.endsWith('.json') && !file.startsWith('statistics'))
            .map(file => {
                const filepath = path.join(dataDir, file);
                const content = fs.readFileSync(filepath, 'utf8');
                return JSON.parse(content);
            })
            .sort((a, b) => (b.submissionId || b.id) - (a.submissionId || a.id));

        res.json({
            success: true,
            count: submissions.length,
            submissions: submissions
        });
    } catch (error) {
        console.error('获取提交记录时出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message
        });
    }
});

// 获取按产品分类的提交记录
app.get('/api/products/:productId', async (req, res) => {
    try {
        const useDatabase = !!process.env.MONGODB_URI;
        const productId = req.params.productId;
        
        if (useDatabase) {
            const submissions = await db.getProductSubmissions(productId);
            return res.json({
                success: true,
                productId: productId,
                count: submissions.length,
                submissions: submissions
            });
        }
        
        // 文件系统读取（仅本地开发）
        if (isVercel) {
            return res.json({
                success: true,
                productId: productId,
                count: 0,
                submissions: [],
                message: 'Vercel 环境需要配置 MongoDB 数据库'
            });
        }
        
        if (!fs.existsSync(productsDir)) {
            return res.json({
                success: true,
                productId: productId,
                count: 0,
                submissions: []
            });
        }
        
        const files = fs.readdirSync(productsDir);
        
        const productSubmissions = files
            .filter(file => file.startsWith(`${productId}_`) && file.endsWith('.json'))
            .map(file => {
                const filepath = path.join(productsDir, file);
                const content = fs.readFileSync(filepath, 'utf8');
                return JSON.parse(content);
            })
            .sort((a, b) => b.submissionId - a.submissionId);

        res.json({
            success: true,
            productId: productId,
            count: productSubmissions.length,
            submissions: productSubmissions
        });
    } catch (error) {
        console.error('获取产品提交记录时出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message
        });
    }
});

// 导出所有数据为JSON文件（用于同步到本地）
app.get('/api/export', async (req, res) => {
    try {
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (!useDatabase) {
            return res.status(400).json({
                success: false,
                message: '此功能需要 MongoDB 数据库支持'
            });
        }
        
        // 从数据库获取所有提交记录
        const submissions = await db.getAllSubmissions();
        
        // 按产品分类组织数据（模拟本地文件结构）
        const exportData = {
            exportTime: new Date().toISOString(),
            exportTimeLocal: new Date().toLocaleString('zh-CN'),
            totalSubmissions: submissions.length,
            submissions: submissions,
            byProduct: {}
        };
        
        // 按产品分类
        submissions.forEach(submission => {
            const productId = submission.productId;
            if (!exportData.byProduct[productId]) {
                exportData.byProduct[productId] = {
                    productId: productId,
                    productName: submission.productName,
                    count: 0,
                    submissions: []
                };
            }
            exportData.byProduct[productId].count++;
            exportData.byProduct[productId].submissions.push(submission);
        });
        
        // 设置响应头，让浏览器下载文件
        const filename = `questionnaire-export-${Date.now()}.json`;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        
        res.json(exportData);
        
    } catch (error) {
        console.error('导出数据时出错:', error);
        res.status(500).json({
            success: false,
            message: '导出数据失败：' + error.message
        });
    }
});

// 获取所有产品的爱心数量
app.get('/api/heart-counts', async (req, res) => {
    try {
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (useDatabase) {
            // 确保数据库连接
            await db.connectDB();
            
            const counts = await db.getHeartCounts();
            console.log('从数据库获取爱心数量:', counts);
            
            // 确保所有产品都有数据（如果数据库中没有，返回默认值2000）
            const allProductIds = [1, 2, 3, 4, 5, 6];
            const result = {};
            allProductIds.forEach(productId => {
                // 如果数据库中有数据，使用数据库数据；否则使用2000
                if (counts[productId] !== undefined && counts[productId] !== null) {
                    result[productId] = counts[productId];
                } else {
                    result[productId] = 2000;
                    console.warn(`产品 ${productId} 在数据库中没有数据，返回默认值2000`);
                }
            });
            
            return res.json({
                success: true,
                heartCounts: result
            });
        }
        
        // 如果没有数据库，返回所有产品的默认值2000
        console.warn('MongoDB未配置，返回默认爱心数量');
        const allProductIds = [1, 2, 3, 4, 5, 6];
        const defaultCounts = {};
        allProductIds.forEach(productId => {
            defaultCounts[productId] = 2000;
        });
        
        res.json({
            success: true,
            heartCounts: defaultCounts,
            message: '数据库未配置，返回默认值'
        });
    } catch (error) {
        console.error('获取爱心数量时出错:', error);
        // 即使出错，也返回默认值，避免前端重置
        const allProductIds = [1, 2, 3, 4, 5, 6];
        const defaultCounts = {};
        allProductIds.forEach(productId => {
            defaultCounts[productId] = 2000;
        });
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message,
            heartCounts: defaultCounts // 返回默认值而不是空对象
        });
    }
});

// 更新产品的爱心数量
app.post('/api/heart-count', async (req, res) => {
    try {
        const { productId, increment } = req.body;
        
        if (productId === undefined || increment === undefined) {
            return res.status(400).json({
                success: false,
                message: '缺少必要参数：productId 和 increment'
            });
        }
        
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (useDatabase) {
            // 确保数据库连接
            await db.connectDB();
            
            // 获取用户信息（用于记录点击历史）
            const userInfo = {
                userAgent: req.headers['user-agent'] || '',
                ip: req.ip || req.connection.remoteAddress || '',
                sessionId: req.headers['x-session-id'] || ''
            };
            
            // 更新爱心数量（同时记录点击历史）
            try {
                const newCount = await db.updateHeartCount(parseInt(productId), parseInt(increment), userInfo);
                
                if (newCount !== null && newCount !== undefined) {
                    console.log(`✅ 产品 ${productId} 爱心数量已保存到数据库: ${newCount}`);
                    return res.json({
                        success: true,
                        productId: parseInt(productId),
                        count: newCount,
                        message: '数据已保存到服务器'
                    });
                } else {
                    console.error(`❌ 产品 ${productId} 数据库更新返回null`);
                    // 即使更新失败，也返回当前值（从数据库查询）
                    const currentCounts = await db.getHeartCounts();
                    const currentCount = currentCounts[parseInt(productId)] || 2000;
                    return res.status(500).json({
                        success: false,
                        message: '数据库更新失败：返回值为null',
                        productId: parseInt(productId),
                        count: currentCount // 返回当前值，避免前端重置
                    });
                }
            } catch (dbError) {
                console.error(`❌ 产品 ${productId} 数据库更新异常:`, dbError);
                // 即使出错，也尝试返回当前值
                try {
                    const currentCounts = await db.getHeartCounts();
                    const currentCount = currentCounts[parseInt(productId)] || 2000;
                    return res.status(500).json({
                        success: false,
                        message: '数据库更新异常：' + dbError.message,
                        productId: parseInt(productId),
                        count: currentCount // 返回当前值，避免前端重置
                    });
                } catch (e) {
                    return res.status(500).json({
                        success: false,
                        message: '数据库更新异常：' + dbError.message,
                        productId: parseInt(productId)
                    });
                }
            }
        }
        
        // 如果没有数据库，返回错误提示
        res.status(503).json({
            success: false,
            productId: parseInt(productId),
            message: '数据库未配置，无法保存数据。请配置 MONGODB_URI 环境变量。'
        });
    } catch (error) {
        console.error('更新爱心数量时出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message
        });
    }
});

// 初始化数据库连接（在服务器启动时）
async function initServer() {
    // 尝试连接数据库
    await db.connectDB();
    
    // 初始化所有产品的爱心数量
    if (process.env.MONGODB_URI) {
        const productIds = [1, 2, 3, 4, 5, 6]; // 根据实际产品ID调整
        try {
            // 确保数据库连接
            const dbConnection = await db.connectDB();
            if (dbConnection) {
                await db.initHeartCounts(productIds);
                console.log('✅ 爱心数量已初始化');
                
                // 验证初始化结果
                const counts = await db.getHeartCounts();
                console.log('初始化后的爱心数量:', counts);
            } else {
                console.error('❌ 数据库连接失败，无法初始化爱心数量');
            }
        } catch (error) {
            console.error('❌ 初始化爱心数量失败:', error);
            console.error('错误详情:', error.message);
        }
    } else {
        console.warn('⚠️  MONGODB_URI未配置，无法初始化爱心数量');
    }
    
    // 启动服务器
    app.listen(PORT, '0.0.0.0', () => {
        const networkInterfaces = os.networkInterfaces();
        let localIP = 'localhost';
        
        // 获取局域网IP地址
        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName];
            for (const iface of interfaces) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    localIP = iface.address;
                    break;
                }
            }
            if (localIP !== 'localhost') break;
        }
        
        console.log(`\n服务器运行成功！`);
        console.log(`本地访问: http://localhost:${PORT}`);
        console.log(`局域网访问: http://${localIP}:${PORT}`);
        console.log(`\n在手机/平板上访问: http://${localIP}:${PORT}`);
        
        if (process.env.MONGODB_URI) {
            console.log(`\n✅ 数据库: MongoDB (已连接)`);
        } else {
            console.log(`\n⚠️  数据库: 未配置 (使用文件系统，仅本地开发)`);
            console.log(`   数据保存目录: ${dataDir}`);
            console.log(`   产品分类目录: ${productsDir}`);
        }
        
        console.log('\n可用API:');
        console.log('  POST /api/submit - 提交问卷');
        console.log('  GET  /api/submissions - 获取所有提交记录');
        console.log('  GET  /api/products/:productId - 获取指定产品的提交记录');
        console.log('  GET  /api/export - 导出所有数据为JSON文件');
        console.log('  GET  /api/heart-counts - 获取所有产品的爱心数量');
        console.log('  POST /api/heart-count - 更新产品的爱心数量（同时记录点击历史）');
    });
}

// 为 Vercel 导出 handler（无服务器函数格式）
// @vercel/node 可以直接导出 Express app
module.exports = app;

// 本地开发时启动服务器
if (require.main === module) {
    initServer().catch(console.error);
}

