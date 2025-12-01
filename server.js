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

// 提供静态文件服务
try {
    // 静态文件服务（必须在路由之前）
    app.use(express.static(__dirname, {
        setHeaders: (res, filePath) => {
            // 为 HTML 文件设置正确的 Content-Type
            if (filePath.endsWith('.html')) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
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
} catch (error) {
    console.error('静态文件服务配置错误:', error);
}

// 根路径返回 index.html
app.get('/', (req, res) => {
    try {
        const indexPath = path.join(__dirname, 'index.html');
        console.log('请求根路径，发送 index.html:', indexPath);
        res.sendFile('index.html', { root: __dirname });
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

// 获取所有产品的统计信息
app.get('/api/statistics', async (req, res) => {
    try {
        const useDatabase = !!process.env.MONGODB_URI;
        
        if (useDatabase) {
            const statistics = await db.getStatistics();
            return res.json({
                success: true,
                totalProducts: statistics.length,
                statistics: statistics
            });
        }
        
        // 文件系统读取（仅本地开发）
        if (isVercel) {
            return res.json({
                success: true,
                totalProducts: 0,
                statistics: [],
                message: 'Vercel 环境需要配置 MongoDB 数据库'
            });
        }
        
        if (!fs.existsSync(productsDir)) {
            return res.json({
                success: true,
                totalProducts: 0,
                statistics: []
            });
        }
        
        const files = fs.readdirSync(productsDir);
        const statistics = {};
        
        files
            .filter(file => file.endsWith('.json'))
            .forEach(file => {
                try {
                    const filepath = path.join(productsDir, file);
                    const content = fs.readFileSync(filepath, 'utf8');
                    const record = JSON.parse(content);
                    
                    const productId = record.productId;
                    if (!statistics[productId]) {
                        statistics[productId] = {
                            productId: productId,
                            productName: record.productName,
                            count: 0,
                            submissions: []
                        };
                    }
                    
                    statistics[productId].count++;
                    statistics[productId].submissions.push({
                        submissionId: record.submissionId,
                        submittedAt: record.submittedAt
                    });
                } catch (error) {
                    console.error(`处理文件 ${file} 时出错:`, error);
                }
            });

        const statisticsArray = Object.values(statistics)
            .sort((a, b) => b.count - a.count);

        res.json({
            success: true,
            totalProducts: statisticsArray.length,
            statistics: statisticsArray
        });
    } catch (error) {
        console.error('获取统计信息时出错:', error);
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
        console.log('  GET  /api/statistics - 获取所有产品的统计信息');
    });
}

// 为 Vercel 导出 handler（无服务器函数格式）
// 必须在文件末尾导出，确保所有路由都已定义
module.exports = app;

// 本地开发时启动服务器
if (require.main === module) {
    initServer().catch(console.error);
}

