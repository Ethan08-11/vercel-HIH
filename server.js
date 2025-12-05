// 加载环境变量（本地开发）
if (require.main === module) {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const compression = require('compression');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 启用压缩（gzip/brotli）- 必须在静态文件服务之前
app.use(compression({
    filter: (req, res) => {
        // 如果请求头中明确要求不压缩，则不压缩
        if (req.headers['x-no-compression']) {
            return false;
        }
        // 默认压缩所有文本资源（HTML、CSS、JS等）
        // 图片通常已经压缩，不需要再次压缩
        return true;
    },
    level: 6, // 压缩级别 1-9，6 是平衡点
    threshold: 1024 // 只压缩大于 1KB 的文件
}));

// 提供静态文件服务（必须在所有路由之前）
// 使用 express.static 处理所有静态文件
app.use(express.static(__dirname, {
    maxAge: '1y', // 设置长期缓存（1年）
    etag: true, // 启用 ETag
    lastModified: true, // 启用 Last-Modified
    setHeaders: (res, filePath) => {
        // 为不同文件类型设置正确的 Content-Type 和缓存策略
        if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            // HTML 文件使用短期缓存，确保更新能及时生效
            res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            // CSS 文件长期缓存，通过版本号控制更新
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            // JS 文件长期缓存，通过版本号控制更新
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
            // 图片文件长期缓存
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
            // WebP 图片长期缓存
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
    },
    index: false // 不自动提供 index.html，由路由处理
}));

// 确保 Picture 目录可访问，并设置图片缓存
app.use('/Picture', express.static(path.join(__dirname, 'Picture'), {
    maxAge: '1y', // 图片长期缓存
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        // 设置图片的 Content-Type 和缓存策略
        if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (filePath.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
        } else if (filePath.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        }
        // 所有图片都使用长期缓存
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        // 添加 CORS 头，允许跨域访问（如果需要）
        res.setHeader('Access-Control-Allow-Origin', '*');
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

// 确保数据目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 确保产品分类目录存在
const productsDir = path.join(dataDir, 'products');
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
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
        const mongoUri = process.env.MONGODB_URI;
        const useDatabase = !!mongoUri;
        
        console.log('🔍 检查数据库配置:');
        console.log('  MONGODB_URI存在:', !!mongoUri);
        console.log('  MONGODB_URI长度:', mongoUri ? mongoUri.length : 0);
        console.log('  环境:', process.env.NODE_ENV || 'development');
        
        if (useDatabase) {
            // 确保数据库连接
            console.log('📡 尝试连接数据库...');
            const dbConnection = await db.connectDB();
            
            if (!dbConnection) {
                console.error('❌ 数据库连接失败，返回默认值');
                // 连接失败时返回默认值，但不重置
                const allProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
                const defaultCounts = {};
                allProductIds.forEach(productId => {
                    defaultCounts[productId] = 2000;
                });
                return res.json({
                    success: false,
                    heartCounts: defaultCounts,
                    message: '数据库连接失败，返回默认值'
                });
            }
            
            console.log('✅ 数据库连接成功，获取爱心数量...');
            const counts = await db.getHeartCounts();
            console.log('📊 从数据库获取爱心数量:', counts);
            
            // 确保所有产品都有数据（如果数据库中没有，返回默认值2000）
            const allProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
            const result = {};
            allProductIds.forEach(productId => {
                // 如果数据库中有数据，使用数据库数据；否则使用2000
                if (counts[productId] !== undefined && counts[productId] !== null) {
                    result[productId] = counts[productId];
                } else {
                    result[productId] = 2000;
                    console.warn(`⚠️ 产品 ${productId} 在数据库中没有数据，返回默认值2000`);
                }
            });
            
            console.log('✅ 返回爱心数量:', result);
            return res.json({
                success: true,
                heartCounts: result
            });
        }
        
        // 如果没有数据库，返回所有产品的默认值2000
        console.warn('⚠️ MongoDB未配置，返回默认爱心数量');
        const allProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
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
        console.error('❌ 获取爱心数量时出错:', error);
        console.error('错误堆栈:', error.stack);
        // 即使出错，也返回默认值，避免前端重置
        const allProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
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
        
        const mongoUri = process.env.MONGODB_URI;
        const useDatabase = !!mongoUri;
        
        console.log(`📝 更新产品 ${productId} 爱心数量: ${increment > 0 ? '+' : ''}${increment}`);
        console.log('  数据库配置:', useDatabase ? '已配置' : '未配置');
        
        if (useDatabase) {
            // 确保数据库连接
            console.log('📡 检查数据库连接...');
            const dbConnection = await db.connectDB();
            
            if (!dbConnection) {
                console.error('❌ 数据库连接失败');
                return res.status(503).json({
                    success: false,
                    message: '数据库连接失败，无法保存数据',
                    productId: parseInt(productId)
                });
            }
            
            // 获取用户信息（用于记录点击历史）
            const userInfo = {
                userAgent: req.headers['user-agent'] || '',
                ip: req.ip || req.connection.remoteAddress || '',
                sessionId: req.headers['x-session-id'] || ''
            };
            
            // 更新爱心数量（同时记录点击历史）
            try {
                console.log(`💾 开始更新数据库...`);
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
                    console.log('📊 尝试获取当前值...');
                    const currentCounts = await db.getHeartCounts();
                    const currentCount = currentCounts[parseInt(productId)] || 2000;
                    console.log(`📊 当前值: ${currentCount}`);
                    return res.status(500).json({
                        success: false,
                        message: '数据库更新失败：返回值为null',
                        productId: parseInt(productId),
                        count: currentCount // 返回当前值，避免前端重置
                    });
                }
            } catch (dbError) {
                console.error(`❌ 产品 ${productId} 数据库更新异常:`, dbError);
                console.error('错误详情:', dbError.message);
                console.error('错误堆栈:', dbError.stack);
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
                    console.error('获取当前值也失败:', e);
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
    console.log('\n🚀 开始初始化服务器...');
    console.log('📋 环境检查:');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('   PORT:', process.env.PORT || 3000);
    console.log('   MONGODB_URI:', process.env.MONGODB_URI ? `已配置 (长度: ${process.env.MONGODB_URI.length})` : '未配置');
    
    // 尝试连接数据库
    console.log('\n📡 尝试连接数据库...');
    const dbConnection = await db.connectDB();
    
    if (dbConnection) {
        console.log('✅ 数据库连接成功');
    } else {
        console.error('❌ 数据库连接失败');
        if (!process.env.MONGODB_URI) {
            console.error('   原因: MONGODB_URI 环境变量未设置');
            console.error('   解决方案: 在Zeabur环境变量中配置MONGODB_URI');
        } else {
            console.error('   原因: 可能是连接字符串错误或网络问题');
            console.error('   建议: 检查MONGODB_URI格式和网络连接');
        }
    }
    
    // 初始化所有产品的爱心数量
    if (process.env.MONGODB_URI && dbConnection) {
        const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]; // 根据实际产品ID调整
        try {
            console.log('\n📊 初始化产品爱心数量...');
            await db.initHeartCounts(productIds);
            console.log('✅ 爱心数量已初始化');
            
            // 验证初始化结果
            const counts = await db.getHeartCounts();
            console.log('📊 初始化后的爱心数量:', counts);
        } catch (error) {
            console.error('❌ 初始化爱心数量失败:', error);
            console.error('错误详情:', error.message);
            console.error('错误堆栈:', error.stack);
        }
    } else {
        if (!process.env.MONGODB_URI) {
            console.warn('⚠️  MONGODB_URI未配置，无法初始化爱心数量');
            console.warn('   在Zeabur部署时，请在环境变量中配置MONGODB_URI');
        } else {
            console.warn('⚠️  数据库连接失败，无法初始化爱心数量');
        }
    }
    
    // 启动服务器（带端口占用检测）
    const server = app.listen(PORT, '0.0.0.0', () => {
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
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`\n❌ 错误: 端口 ${PORT} 已被占用`);
            console.error(`\n解决方案:`);
            console.error(`1. 关闭占用端口的进程:`);
            if (process.platform === 'win32') {
                console.error(`   Windows: netstat -ano | findstr :${PORT}`);
                console.error(`   然后: taskkill /F /PID <PID>`);
            } else {
                console.error(`   Linux/Mac: lsof -i :${PORT}`);
                console.error(`   然后: kill -9 <PID>`);
            }
            console.error(`\n2. 或使用其他端口:`);
            console.error(`   Windows: set PORT=3001 && npm start`);
            console.error(`   Linux/Mac: PORT=3001 npm start`);
            process.exit(1);
        } else {
            console.error('服务器启动失败:', err);
            process.exit(1);
        }
    });
}

module.exports = app;

// 本地开发时启动服务器
if (require.main === module) {
    initServer().catch(console.error);
}

