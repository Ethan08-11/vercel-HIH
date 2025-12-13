// 立即输出日志（在任何其他代码之前）
// 这是为了确保 Zeabur 能看到日志输出
try {
    process.stdout.write('\n');
    process.stdout.write('='.repeat(70) + '\n');
    process.stdout.write('🚀 SERVER.JS 文件开始加载\n');
    process.stdout.write('='.repeat(70) + '\n');
    process.stdout.write(`⏰ 加载时间: ${new Date().toISOString()}\n`);
    process.stdout.write(`📦 Node版本: ${process.version}\n`);
    process.stdout.write(`🆔 进程ID: ${process.pid}\n`);
    if (process.stdout && typeof process.stdout.flush === 'function') {
        process.stdout.flush();
    }
} catch (e) {
    // 如果输出失败，至少尝试 console.log
    console.log('SERVER.JS 文件开始加载');
}

// 加载环境变量（本地开发）
if (require.main === module) {
    try {
        process.stdout.write('📋 加载环境变量 (dotenv)...\n');
        if (process.stdout && typeof process.stdout.flush === 'function') {
            process.stdout.flush();
        }
    } catch (e) {}
    require('dotenv').config();
}

// 输出模块加载日志
try {
    process.stdout.write('📦 开始加载 Node.js 模块...\n');
    if (process.stdout && typeof process.stdout.flush === 'function') {
        process.stdout.flush();
    }
} catch (e) {}

const express = require('express');
try {
    process.stdout.write('✅ Express 模块已加载\n');
    if (process.stdout && typeof process.stdout.flush === 'function') {
        process.stdout.flush();
    }
} catch (e) {}

const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const compression = require('compression');

try {
    process.stdout.write('✅ 基础模块已加载，正在加载数据库模块...\n');
    if (process.stdout && typeof process.stdout.flush === 'function') {
        process.stdout.flush();
    }
} catch (e) {}

const db = require('./db');

try {
    process.stdout.write('✅ 所有模块加载完成\n');
    process.stdout.write('='.repeat(70) + '\n');
    if (process.stdout && typeof process.stdout.flush === 'function') {
        process.stdout.flush();
    }
} catch (e) {}

// 获取产品的初始爱心数量（服务器端统一为2000）
function getRandomInitialCount(productId) {
    // 服务器端所有产品的初始爱心数量统一为2000
    return 2000;
}

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 请求日志中间件（记录所有HTTP请求，确保Zeabur能看到活动）
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// 处理 site.webmanifest 和 manifest.json 请求 - 必须在静态文件服务之前，避免404错误
app.get('/site.webmanifest', (req, res) => {
    const manifest = {
        "name": "HIH教堂设计产品调查问卷",
        "short_name": "HIH问卷",
        "description": "图片轮播式产品调查问卷",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#667eea",
        "theme_color": "#764ba2",
        "icons": []
    };
    res.setHeader('Content-Type', 'application/manifest+json');
    res.json(manifest);
});

app.get('/manifest.json', (req, res) => {
    // 重定向到 site.webmanifest 或返回相同内容
    const manifest = {
        "name": "HIH教堂设计产品调查问卷",
        "short_name": "HIH问卷",
        "description": "图片轮播式产品调查问卷",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#667eea",
        "theme_color": "#764ba2",
        "icons": []
    };
    res.setHeader('Content-Type', 'application/manifest+json');
    res.json(manifest);
});

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
    setHeaders: (res, filePath, stat) => {
        // 为不同文件类型设置正确的 Content-Type 和缓存策略
        if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            // HTML 文件强制不缓存，确保移动端及时更新
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            // CSS 文件：根据环境决定缓存策略
            // 注意：版本号检查需要在路由层面处理，这里统一设置
            if (process.env.NODE_ENV === 'production') {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else {
                res.setHeader('Cache-Control', 'no-cache, must-revalidate');
            }
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            // JS 文件：根据环境决定缓存策略
            // 注意：版本号检查需要在路由层面处理，这里统一设置
            if (process.env.NODE_ENV === 'production') {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else {
                res.setHeader('Cache-Control', 'no-cache, must-revalidate');
            }
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
    maxAge: '1y', // 长期缓存1年，提高加载速度
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
        // 图片使用长期缓存（1年），通过版本号控制更新
        // 如果图片文件名或版本号改变，浏览器会自动获取新图片
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        // 添加 CORS 头，允许跨域访问（如果需要）
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

console.log('静态文件服务已配置');
console.log('根目录:', __dirname);
console.log('Picture 目录:', path.join(__dirname, 'Picture'));

// 明确处理静态文件路由（作为备用，express.static 应该已经处理了）
// 处理带版本号的 CSS 和 JS 文件，强制不缓存
app.get('/style.css', (req, res) => {
    console.log('请求 /style.css');
    // 如果URL中包含版本号，强制不缓存
    if (req.url.includes('?v=')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
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
    // 如果URL中包含版本号，强制不缓存
    if (req.url.includes('?v=')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.sendFile('script.js', { root: __dirname }, (err) => {
        if (err) {
            console.error('发送 script.js 失败:', err);
            res.status(404).send('File not found');
        } else {
            console.log('script.js 发送成功');
        }
    });
});

// 处理favicon请求 - 避免404错误
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // 返回204 No Content
});

// 处理图片请求
app.get('/Picture/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('请求图片:', filename);
    
    // 设置正确的 Content-Type
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
    } else if (filename.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
    } else if (filename.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
    }
    
    // 图片使用长期缓存（1年），通过版本号控制更新
    // URL中包含版本号（?v=xxx）时，浏览器会将其视为新资源
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    res.sendFile(filename, { root: path.join(__dirname, 'Picture') }, (err) => {
        if (err) {
            console.error('发送图片失败:', err);
            res.status(404).send('Image not found');
        } else {
            console.log('图片发送成功:', filename);
        }
    });
});

// 根路径返回 index.html（必须在静态文件服务之后，但优先级更高）
app.get('/', (req, res) => {
    try {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] 请求根路径，发送 index.html`);
        console.log(`   文件路径: ${path.join(__dirname, 'index.html')}`);
        console.log(`   文件存在: ${require('fs').existsSync(path.join(__dirname, 'index.html'))}`);
        
        // 设置HTML文件的缓存头 - 强制不缓存，确保移动端及时更新
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        
        const indexPath = path.join(__dirname, 'index.html');
        
        // 检查文件是否存在
        if (!require('fs').existsSync(indexPath)) {
            console.error('❌ index.html 文件不存在:', indexPath);
            res.status(404).send(`
                <html>
                    <head><title>文件未找到</title></head>
                    <body>
                        <h1>404 - 文件未找到</h1>
                        <p>index.html 文件不存在于: ${indexPath}</p>
                        <p>当前工作目录: ${__dirname}</p>
                    </body>
                </html>
            `);
            return;
        }
        
        res.sendFile('index.html', { root: __dirname }, (err) => {
            if (err) {
                console.error('❌ 发送 index.html 失败:', err.message);
                console.error('   错误代码:', err.code);
                console.error('   错误堆栈:', err.stack);
                res.status(500).send(`
                    <html>
                        <head><title>服务器错误</title></head>
                        <body>
                            <h1>500 - 服务器错误</h1>
                            <p>无法加载页面: ${err.message}</p>
                            <p>文件路径: ${indexPath}</p>
                        </body>
                    </html>
                `);
            } else {
                console.log('✅ index.html 发送成功');
            }
        });
    } catch (error) {
        console.error('发送 index.html 时出错:', error);
        console.error('   错误堆栈:', error.stack);
        res.status(500).send(`
            <html>
                <head><title>服务器错误</title></head>
                <body>
                    <h1>500 - 服务器错误</h1>
                    <p>无法加载页面: ${error.message}</p>
                </body>
            </html>
        `);
    }
});

// 确保所有静态资源都能正确加载
app.get('/index.html', (req, res) => {
    console.log('请求 /index.html');
    // 设置HTML文件的缓存头 - 强制不缓存，确保移动端及时更新
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    const indexPath = path.join(__dirname, 'index.html');
    if (!require('fs').existsSync(indexPath)) {
        console.error('❌ index.html 文件不存在:', indexPath);
        res.status(404).send('文件未找到');
        return;
    }
    
    res.sendFile('index.html', { root: __dirname }, (err) => {
        if (err) {
            console.error('❌ 发送 index.html 失败:', err.message);
            res.status(500).send('无法加载页面: ' + err.message);
        } else {
            console.log('✅ index.html 发送成功');
        }
    });
});

// 添加健康检查路由（用于诊断）
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        env: {
            NODE_ENV: process.env.NODE_ENV || 'development',
            PORT: process.env.PORT || 3000
        },
        files: {
            indexHtml: require('fs').existsSync(path.join(__dirname, 'index.html')),
            scriptJs: require('fs').existsSync(path.join(__dirname, 'script.js')),
            styleCss: require('fs').existsSync(path.join(__dirname, 'style.css'))
        }
    });
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
            // 确保数据库连接（只在首次调用时输出日志）
            const dbConnection = await db.connectDB();
            
            if (!dbConnection) {
                console.warn('⚠️ 数据库连接失败，返回默认值（应用仍可正常使用）');
                // 连接失败时返回默认值，但返回success:true，让前端能正常使用
                const allProductIds = Array.from({ length: 63 }, (_, i) => i + 1);
                const defaultCounts = {};
                allProductIds.forEach(productId => {
                    defaultCounts[productId] = getRandomInitialCount(productId);
                });
                return res.json({
                    success: true, // 改为true，让前端能正常使用
                    heartCounts: defaultCounts,
                    message: '数据库连接失败，返回默认值（数据仅本地有效）',
                    databaseAvailable: false // 标记数据库不可用
                });
            }
            
            console.log('✅ 数据库连接成功，获取爱心数量...');
            const counts = await db.getHeartCounts();
            console.log('📊 从数据库获取爱心数量:', counts);
            
            // 确保所有产品都有数据（统一返回2000作为初始值）
            const allProductIds = Array.from({ length: 63 }, (_, i) => i + 1);
            const result = {};
            allProductIds.forEach(productId => {
                // 服务器端统一返回2000作为初始值
                if (counts[productId] !== undefined && counts[productId] !== null) {
                    // 如果数据库中有数据
                    const dbCount = counts[productId];
                    // 服务器端统一从2000开始递增的逻辑：
                    // - 如果值等于2000，返回2000（服务器初始值）
                    // - 如果值在2001-2050之间，很可能是用户点击后的值（2000+点击次数），返回真实值
                    // - 如果值在2051-3000之间，可能是旧数据（客户端随机值被错误保存），重置为2000
                    // - 如果值大于3000，说明用户点击了很多次，返回真实值
                    // - 如果值小于2000，返回2000（异常值）
                    if (dbCount === 2000) {
                        result[productId] = 2000; // 服务器初始值
                    } else if (dbCount > 2000 && dbCount <= 2050) {
                        // 2001-2050之间，很可能是用户点击后的值（2000+点击次数），返回真实值
                        result[productId] = dbCount;
                    } else if (dbCount > 2050 && dbCount <= 3000) {
                        // 2051-3000之间，可能是旧数据（客户端随机值被错误保存），重置为2000
                        // 服务器端应该始终从2000开始，与客户端随机值相互独立
                        result[productId] = 2000;
                        console.log(`🔄 产品 ${productId} 服务器值 ${dbCount} 可能是旧数据，重置为2000`);
                    } else if (dbCount > 3000) {
                        // 大于3000，用户点击了很多次，返回真实值
                        result[productId] = dbCount;
                    } else {
                        // 小于2000的异常值，返回2000
                        result[productId] = 2000;
                    }
                } else {
                    // 如果数据库中没有数据，返回初始值2000
                    result[productId] = getRandomInitialCount(productId); // 返回2000
                }
            });
            
            console.log('✅ 返回爱心数量:', result);
            return res.json({
                success: true,
                heartCounts: result
            });
        }
        
        // 如果没有数据库，返回所有产品的初始值（统一为2000）
        console.warn('⚠️ MongoDB未配置，返回随机初始爱心数量');
        const allProductIds = Array.from({ length: 63 }, (_, i) => i + 1);
        const defaultCounts = {};
        allProductIds.forEach(productId => {
            defaultCounts[productId] = getRandomInitialCount(productId);
        });
        
        res.json({
            success: true,
            heartCounts: defaultCounts,
            message: '数据库未配置，返回默认值'
        });
    } catch (error) {
        console.error('❌ 获取爱心数量时出错:', error);
        console.error('错误堆栈:', error.stack);
        // 即使出错，也返回随机初始值，避免前端重置
        const allProductIds = Array.from({ length: 63 }, (_, i) => i + 1);
        const defaultCounts = {};
        allProductIds.forEach(productId => {
            defaultCounts[productId] = getRandomInitialCount(productId);
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
            // 确保数据库连接（静默检查，避免重复日志）
            const dbConnection = await db.connectDB();
            
            if (!dbConnection) {
                console.warn('⚠️ 数据库连接失败，无法保存数据（但允许本地操作）');
                // 返回200而不是503，避免前端报错，但提示无法保存到服务器
                return res.json({
                    success: false,
                    message: '数据库连接失败，数据仅本地有效，无法保存到服务器',
                    productId: parseInt(productId),
                    databaseAvailable: false, // 标记数据库不可用
                    localOnly: true // 标记为仅本地操作
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
                    const currentCount = currentCounts[parseInt(productId)] || getRandomInitialCount(parseInt(productId));
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
                    const currentCount = currentCounts[parseInt(productId)] || getRandomInitialCount(parseInt(productId));
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
        
        // 如果没有数据库，返回提示（但不返回503，避免前端报错）
        res.json({
            success: false,
            productId: parseInt(productId),
            message: '数据库未配置，数据仅本地有效。请配置 MONGODB_URI 环境变量以启用服务器保存。',
            databaseAvailable: false,
            localOnly: true
        });
    } catch (error) {
        console.error('更新爱心数量时出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误：' + error.message
        });
    }
});

// 全局变量，用于存储服务器实例
let serverInstance = null;
let isShuttingDown = false;

// 优雅关闭服务器
async function gracefulShutdown(signal) {
    if (isShuttingDown) {
        console.log('⚠️  正在关闭中，忽略重复信号...');
        return;
    }
    
    isShuttingDown = true;
    console.log(`\n📡 收到 ${signal} 信号，开始优雅关闭服务器...`);
    
    // 设置关闭超时（30秒）
    const shutdownTimeout = setTimeout(() => {
        console.error('❌ 优雅关闭超时，强制退出');
        process.exit(1);
    }, 30000);
    
    try {
        // 1. 停止接受新连接
        if (serverInstance) {
            console.log('🛑 停止接受新连接...');
            serverInstance.close(() => {
                console.log('✅ HTTP服务器已关闭');
            });
        }
        
        // 2. 关闭数据库连接
        console.log('🔌 关闭数据库连接...');
        await db.disconnectDB();
        console.log('✅ 数据库连接已关闭');
        
        // 清除超时
        clearTimeout(shutdownTimeout);
        
        console.log('✅ 服务器已优雅关闭');
        process.exit(0);
    } catch (error) {
        console.error('❌ 关闭过程中出错:', error);
        clearTimeout(shutdownTimeout);
        process.exit(1);
    }
}

// 注册信号处理器
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
    console.error('❌ 未捕获的异常:', error);
    gracefulShutdown('uncaughtException').catch(() => {
        process.exit(1);
    });
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ 未处理的Promise拒绝:', reason);
    gracefulShutdown('unhandledRejection').catch(() => {
        process.exit(1);
    });
});

// 检测是否为Zeabur环境
function isZeaburEnvironment() {
    // 优先检查ZEABUR环境变量（如果在Zeabur部署，建议设置此变量）
    // 如果没有设置，通过检查是否有PORT环境变量且不在本地常用端口判断
    return !!process.env.ZEABUR || 
           (!!process.env.PORT && process.env.PORT !== '3000' && process.env.NODE_ENV === 'production') ||
           (process.env.NODE_ENV === 'production' && !process.env.USER && !process.env.HOME);
}

// 初始化数据库连接（在服务器启动时）
async function initServer() {
    const isZeabur = isZeaburEnvironment();
    
    console.log('\n🚀 开始初始化服务器...');
    console.log('📋 环境检查:');
    console.log('   环境:', isZeabur ? 'Zeabur (生产)' : '本地开发');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('   PORT:', process.env.PORT || 3000);
    console.log('   MONGODB_URI:', process.env.MONGODB_URI ? `已配置 (长度: ${process.env.MONGODB_URI.length})` : '未配置');
    
    // 在Zeabur上，先快速启动服务器，然后异步连接数据库
    // 这样可以确保应用快速上线，即使数据库连接失败也不影响HTTP服务
    let dbConnection = null;
    
    if (isZeabur) {
        // Zeabur环境：快速启动服务器，数据库连接异步进行
        console.log('\n⚡ Zeabur环境：快速启动模式');
        
        // 立即启动服务器（不等待数据库）
        startServerFast();
        
        // 异步尝试连接数据库（不阻塞启动）
        // 使用 setTimeout 延迟执行，确保服务器先启动
        setTimeout(() => {
            (async () => {
                console.log('\n📡 后台尝试连接数据库（不阻塞服务器启动）...');
                try {
                    // 在 Zeabur 上，给数据库连接更多时间（30秒）
                    // db.connectDB() 内部已经有超时控制，这里不需要额外的 Promise.race
                    dbConnection = await db.connectDB();
                    
                    if (dbConnection) {
                        console.log('✅ 数据库连接成功（后台连接）');
                        // 初始化爱心数量（后台异步执行）
                        initializeHeartCountsAsync();
                    } else {
                        console.warn('⚠️  数据库连接失败，应用将继续运行（数据仅本地有效）');
                        console.warn('   提示: 检查 MONGODB_URI 环境变量和网络连接');
                        console.warn('   应用功能正常，但数据不会保存到 MongoDB');
                    }
                } catch (error) {
                    // 捕获所有可能的错误，确保不会导致应用崩溃
                    console.warn('⚠️  数据库连接失败，应用将继续运行（数据仅本地有效）');
                    console.warn('   错误:', error.message);
                    if (error.message.includes('超时') || error.message.includes('timeout')) {
                        console.warn('   提示: 连接超时，可能是网络问题或 MongoDB 服务器不可达');
                        console.warn('   这是正常的，应用会使用文件系统存储');
                    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
                        console.warn('   提示: DNS 解析失败，可能是主机名错误或网络问题');
                    } else {
                        console.warn('   提示: 数据库连接失败，但不影响应用运行');
                    }
                    dbConnection = null;
                }
            })().catch((err) => {
                // 额外的错误捕获，确保任何未预期的错误都不会导致问题
                console.warn('⚠️  数据库连接过程中发生未预期的错误:', err.message);
                console.warn('   应用将继续运行，使用文件系统存储');
                dbConnection = null;
            });
        }, 2000); // 延迟2秒，确保服务器先完全启动
    } else {
        // 本地开发环境：等待数据库连接
        console.log('\n📡 尝试连接数据库...');
        try {
            const connectPromise = db.connectDB();
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('连接超时')), 10000) // 本地开发用10秒
        );
        
        dbConnection = await Promise.race([connectPromise, timeoutPromise]);
        
        if (dbConnection) {
            console.log('✅ 数据库连接成功');
        } else {
            console.warn('⚠️  数据库连接失败，服务器将继续运行（使用文件系统存储）');
            if (!process.env.MONGODB_URI) {
                console.warn('   原因: MONGODB_URI 环境变量未设置');
            } else {
                console.warn('   原因: 可能是连接字符串错误或网络问题');
            }
        }
    } catch (error) {
        console.warn('⚠️  数据库连接超时或失败，服务器将继续运行（使用文件系统存储）');
        console.warn('   错误:', error.message);
        dbConnection = null;
        }
        
        // 本地环境：同步启动服务器
        startServerFast();
    }
    
    // 保存数据库连接状态供后续使用
    return dbConnection;
    }
    
// 异步初始化爱心数量（不阻塞服务器启动）
function initializeHeartCountsAsync() {
    if (!process.env.MONGODB_URI) {
        console.warn('⚠️  MONGODB_URI未配置，无法初始化爱心数量');
        return;
    }
    
    const productIds = Array.from({ length: 63 }, (_, i) => i + 1);
    
        // 使用异步执行，不阻塞服务器启动
        (async () => {
            try {
            // 等待一下确保数据库连接完成
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('📊 后台初始化产品爱心数量...');
                await db.initHeartCounts(productIds);
                console.log('✅ 爱心数量已初始化');
                
            // 验证初始化结果（简化日志，避免过多输出）
                const counts = await db.getHeartCounts();
                const countKeys = Object.keys(counts || {});
                console.log(`📊 初始化后的爱心数量: 共 ${countKeys.length} 个产品`);
            } catch (error) {
            console.error('❌ 初始化爱心数量失败:', error.message);
            // 不阻止服务器运行
            }
        })();
}

// 快速启动服务器（优化后的启动函数）
function startServerFast() {
    const isZeabur = isZeaburEnvironment();
    const port = parseInt(process.env.PORT || '3000', 10);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 正在启动HTTP服务器...`);
    console.log(`   端口: ${port}`);
    console.log(`   监听地址: 0.0.0.0`);
    console.log(`   环境: ${isZeabur ? 'Zeabur (生产)' : '本地开发'}`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
    console.log(`${'='.repeat(60)}`);
    
    try {
        // 确保在启动前输出日志
        console.log('📡 正在创建HTTP服务器实例...');
        
        serverInstance = app.listen(port, '0.0.0.0', () => {
        console.log(`\n✅ 服务器运行成功！`);
        console.log(`   端口: ${port}`);
        console.log(`   环境: ${isZeabur ? 'Zeabur (生产)' : '本地开发'}`);
        
        if (!isZeabur) {
            // 只在本地开发环境显示详细网络信息
            const networkInterfaces = os.networkInterfaces();
            let localIP = 'localhost';
            
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
            
            console.log(`   本地访问: http://localhost:${port}`);
            console.log(`   局域网访问: http://${localIP}:${port}`);
            } else {
            // Zeabur环境：显示简洁信息
            console.log(`   HTTP服务已就绪，等待请求...`);
            }
            
            console.log('\n可用API:');
            console.log('  POST /api/submit - 提交问卷');
            console.log('  GET  /api/submissions - 获取所有提交记录');
            console.log('  GET  /api/products/:productId - 获取指定产品的提交记录');
            console.log('  GET  /api/export - 导出所有数据为JSON文件');
            console.log('  GET  /api/heart-counts - 获取所有产品的爱心数量');
        console.log('  POST /api/heart-count - 更新产品的爱心数量');
            console.log('\n' + '='.repeat(60));
            console.log('✅ 服务器已就绪，可以接受请求！');
            console.log('='.repeat(60) + '\n');
            
            // 确保日志被刷新
            if (process.stdout && typeof process.stdout.flush === 'function') {
                process.stdout.flush();
            }
            
            // 在Zeabur上，启动定期心跳日志，确保日志系统能看到应用在运行
            if (isZeabur) {
                // 立即输出第一条心跳日志（确保 Zeabur 能看到应用已启动）
                const outputHeartbeat = () => {
                    const uptime = Math.floor(process.uptime());
                    const memUsage = process.memoryUsage();
                    const msg = `💓 [心跳] 服务器运行中 - 运行时间: ${uptime}秒, 内存: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`;
                    process.stdout.write(msg + '\n');
                    if (process.stdout && typeof process.stdout.flush === 'function') {
                        try {
                            process.stdout.flush();
                        } catch (e) {}
                    }
                };
                
                // 立即输出第一条心跳
                setTimeout(outputHeartbeat, 1000);
                
                // 每30秒输出一次心跳日志
                const heartbeatInterval = setInterval(outputHeartbeat, 30000); // 30秒
                
                // 在服务器关闭时清除定时器
                serverInstance.on('close', () => {
                    clearInterval(heartbeatInterval);
                });
                
                // 输出初始心跳
                console.log('💓 [心跳] 服务器已启动，心跳监控已启用（每30秒）');
            }
        }).on('error', (err) => {
            console.error('\n' + '='.repeat(60));
            console.error('❌ HTTP服务器启动失败！');
            console.error('='.repeat(60));
            console.error('   错误消息:', err.message);
            console.error('   错误代码:', err.code);
            if (err.code === 'EADDRINUSE') {
            console.error(`   端口 ${port} 已被占用`);
            if (!isZeabur) {
                console.error('   解决方案: 关闭占用端口的进程或使用其他端口');
                } else {
                    console.error('   这可能表示Zeabur端口配置有问题');
                }
            } else if (err.code === 'EACCES') {
                console.error(`   端口 ${port} 权限不足`);
                console.error('   这通常表示需要root权限或端口号小于1024');
            } else if (err.code === 'EADDRNOTAVAIL') {
                console.error(`   地址 0.0.0.0:${port} 不可用`);
            }
            if (err.syscall) {
                console.error('   系统调用:', err.syscall);
            }
            if (err.address) {
                console.error('   地址:', err.address);
            }
            if (err.port) {
                console.error('   端口:', err.port);
            }
            if (err.stack) {
                console.error('\n   错误堆栈:');
                console.error(err.stack);
            }
            console.error('='.repeat(60));
            
            // 确保错误日志被刷新
            if (process.stderr && typeof process.stderr.flush === 'function') {
                process.stderr.flush();
            }
            
            // 在Zeabur上等待一段时间让日志输出
            const waitTime = isZeabur ? 5000 : 1000;
            setTimeout(() => {
                process.exit(1);
            }, waitTime);
        });
    
        // 确保服务器实例被正确保存
        if (!serverInstance) {
            throw new Error('服务器实例创建失败：app.listen() 返回了 null 或 undefined');
        }
        
        console.log('✅ HTTP服务器实例创建成功');
    return serverInstance;
    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('❌ 启动服务器时发生异常:');
        console.error('='.repeat(60));
        console.error('   错误类型:', error.constructor.name);
        console.error('   错误消息:', error.message);
        if (error.stack) {
            console.error('\n   错误堆栈:');
            console.error(error.stack);
        }
        console.error('='.repeat(60));
        
        // 确保错误日志被刷新
        if (process.stderr && typeof process.stderr.flush === 'function') {
            process.stderr.flush();
        }
        
        // 在Zeabur上等待一段时间让日志输出
        const waitTime = isZeabur ? 5000 : 1000;
        setTimeout(() => {
            process.exit(1);
        }, waitTime);
    }
}

module.exports = app;

// 立即输出启动信息（在模块加载时）
// 使用 process.stdout.write 确保立即输出，不被缓冲
// 这对于 Zeabur 日志系统非常重要
(function() {
    // 立即输出第一条日志，确保 Zeabur 能看到
    try {
        process.stdout.write('\n');
        process.stdout.write('='.repeat(60) + '\n');
        process.stdout.write('🚀 Node.js 应用开始启动\n');
        process.stdout.write('='.repeat(60) + '\n');
        
        const timestamp = new Date().toISOString();
        process.stdout.write(`⏰ 时间: ${timestamp}\n`);
        process.stdout.write(`📦 Node版本: ${process.version}\n`);
        process.stdout.write(`📁 工作目录: ${__dirname}\n`);
        process.stdout.write(`🆔 进程ID: ${process.pid}\n`);
        process.stdout.write(`🌍 平台: ${process.platform}\n`);
        process.stdout.write(`💻 架构: ${process.arch}\n`);
        
        // 输出环境变量状态（不输出敏感信息）
        process.stdout.write('\n📋 环境变量检查:\n');
        process.stdout.write(`   NODE_ENV: ${process.env.NODE_ENV || '未设置'}\n`);
        process.stdout.write(`   PORT: ${process.env.PORT || '未设置（将使用3000）'}\n`);
        process.stdout.write(`   MONGODB_URI: ${process.env.MONGODB_URI ? '已设置（长度: ' + process.env.MONGODB_URI.length + '）' : '未设置'}\n`);
        process.stdout.write(`   DB_NAME: ${process.env.DB_NAME || '未设置（将使用questionnaire）'}\n`);
        process.stdout.write(`   ZEABUR: ${process.env.ZEABUR || '未设置'}\n`);
        
        process.stdout.write('='.repeat(60) + '\n');
        process.stdout.write('📋 开始加载模块...\n');
        
        // 强制刷新输出
        if (process.stdout && typeof process.stdout.flush === 'function') {
            try {
                process.stdout.flush();
            } catch (e) {
                // 忽略 flush 错误
            }
        }
        
        // 使用多个 setImmediate 确保输出被处理
        setImmediate(() => {
            process.stdout.write('✅ Express 模块已加载\n');
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
        });
        
        setImmediate(() => {
            process.stdout.write('✅ 所有模块加载完成，准备初始化服务器...\n');
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
        });
    } catch (error) {
        // 如果输出日志时出错，至少输出错误信息
        try {
            process.stderr.write('❌ 输出启动日志时出错: ' + error.message + '\n');
            if (process.stderr && typeof process.stderr.flush === 'function') {
                process.stderr.flush();
            }
        } catch (e) {
            // 如果连错误都无法输出，至少尝试输出到控制台
            console.error('无法输出日志:', error);
        }
    }
})();

// 本地开发时启动服务器
if (require.main === module) {
    // 立即输出启动信息
    try {
        process.stdout.write('\n');
        process.stdout.write('='.repeat(70) + '\n');
        process.stdout.write('🚀 检测到主模块执行，开始启动服务器\n');
        process.stdout.write('='.repeat(70) + '\n');
        process.stdout.write(`⏰ 启动时间: ${new Date().toISOString()}\n`);
        process.stdout.write(`📁 工作目录: ${__dirname}\n`);
        process.stdout.write(`🆔 进程ID: ${process.pid}\n`);
        process.stdout.write(`🌍 平台: ${process.platform}\n`);
        process.stdout.write(`💻 架构: ${process.arch}\n`);
        if (process.stdout && typeof process.stdout.flush === 'function') {
            process.stdout.flush();
        }
    } catch (e) {
        console.log('开始启动服务器');
    }
    
    // 使用 try-catch 包装，确保所有错误都被捕获
    (async () => {
        try {
            // 使用 process.stdout.write 确保立即输出
            process.stdout.write('\n');
            process.stdout.write('='.repeat(70) + '\n');
            process.stdout.write('📋 服务器启动流程开始\n');
            process.stdout.write('='.repeat(70) + '\n');
            process.stdout.write(`   进程ID: ${process.pid}\n`);
            process.stdout.write(`   平台: ${process.platform}\n`);
            process.stdout.write(`   架构: ${process.arch}\n`);
            
            // 立即输出环境变量信息（不输出敏感信息）
            process.stdout.write('\n📋 环境变量检查:\n');
            process.stdout.write(`   NODE_ENV: ${process.env.NODE_ENV || '未设置'}\n`);
            process.stdout.write(`   PORT: ${process.env.PORT || '未设置（将使用3000）'}\n`);
            process.stdout.write(`   MONGODB_URI: ${process.env.MONGODB_URI ? '已设置（长度: ' + process.env.MONGODB_URI.length + '）' : '未设置'}\n`);
            process.stdout.write(`   DB_NAME: ${process.env.DB_NAME || '未设置（将使用questionnaire）'}\n`);
            process.stdout.write(`   ZEABUR: ${process.env.ZEABUR || '未设置'}\n`);
            
            // 强制刷新
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
            
            process.stdout.write('\n🔄 开始初始化服务器...\n');
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
            
            await initServer();
            
            process.stdout.write('\n');
            process.stdout.write('='.repeat(60) + '\n');
            process.stdout.write('✅ 服务器初始化完成！\n');
            process.stdout.write('   服务器已就绪，等待请求...\n');
            process.stdout.write('='.repeat(60) + '\n');
            
            // 强制刷新
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
        } catch (error) {
            // 使用 stderr 输出错误，确保能被 Zeabur 捕获
            const outputError = (msg) => {
                process.stderr.write(msg + '\n');
                if (process.stderr && typeof process.stderr.flush === 'function') {
                    try {
                        process.stderr.flush();
                    } catch (e) {}
                }
            };
            
            outputError('\n' + '='.repeat(60));
            outputError('❌ 服务器启动失败:');
            outputError('='.repeat(60));
            outputError('   错误类型: ' + error.constructor.name);
            outputError('   错误消息: ' + error.message);
            if (error.code) {
                outputError('   错误代码: ' + error.code);
            }
            if (error.syscall) {
                outputError('   系统调用: ' + error.syscall);
            }
            if (error.address) {
                outputError('   地址: ' + error.address);
            }
            if (error.port) {
                outputError('   端口: ' + error.port);
            }
            if (error.stack) {
                outputError('\n   错误堆栈:');
                outputError(error.stack);
            }
            outputError('='.repeat(60));
            
            // 在 Zeabur 上，即使启动失败也要等待一段时间，让日志输出
            const isZeabur = isZeaburEnvironment();
            const waitTime = isZeabur ? 15000 : 2000; // Zeabur上等待15秒确保日志输出
            outputError('\n⏳ ' + (waitTime/1000) + '秒后退出...');
            
            // 确保错误信息被刷新
            if (process.stdout && typeof process.stdout.flush === 'function') {
                try {
                    process.stdout.flush();
                } catch (e) {}
            }
            if (process.stderr && typeof process.stderr.flush === 'function') {
                try {
                    process.stderr.flush();
                } catch (e) {}
            }
            
            setTimeout(() => {
                outputError('💀 进程退出');
                process.exit(1);
            }, waitTime);
        }
    })();
}

