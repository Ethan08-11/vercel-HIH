const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // 提供静态文件服务

// 确保数据目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// 确保产品分类目录存在
const productsDir = path.join(dataDir, 'products');
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir);
}

// 提交问卷数据的API
app.post('/api/submit', (req, res) => {
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

        // 按产品分类存储（使用新的命名格式）
        if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
            selectedProducts.forEach(product => {
                const productId = product.id;
                const productName = product.name || `产品${productId}`;
                
                // 为每个产品创建完整的记录
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

                // 使用新格式保存到主目录：[产品ID]_[产品名称]_[提交ID].json
                const filename = `${productId}_${productName}_${submissionId}.json`;
                const filepath = path.join(dataDir, filename);
                fs.writeFileSync(filepath, JSON.stringify(productRecord, null, 2), 'utf8');
                
                // 同时保存到产品分类目录（保持一致性）
                const productFilepath = path.join(productsDir, filename);
                fs.writeFileSync(productFilepath, JSON.stringify(productRecord, null, 2), 'utf8');
                
                console.log(`产品 ${productName} (ID: ${productId}) 的提交已保存: ${filename}`);
            });
        } else {
            // 如果没有选择产品，保存一个通用记录（不应该发生，但作为备用）
            const submission = {
                id: submissionId,
                timestamp: submitTime,
                answers: answers,
                selectedProducts: selectedProducts || [],
                submittedAt: submittedAt
            };
            const filename = `submission_${submissionId}.json`;
            const filepath = path.join(dataDir, filename);
            fs.writeFileSync(filepath, JSON.stringify(submission, null, 2), 'utf8');
        }

        console.log('收到问卷提交，已按产品分类保存');

        // 返回成功响应
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
app.get('/api/submissions', (req, res) => {
    try {
        const files = fs.readdirSync(dataDir);
        const submissions = files
            .filter(file => file.endsWith('.json') && !file.startsWith('statistics'))
            .map(file => {
                const filepath = path.join(dataDir, file);
                const content = fs.readFileSync(filepath, 'utf8');
                return JSON.parse(content);
            })
            .sort((a, b) => (b.submissionId || b.id) - (a.submissionId || a.id)); // 按时间倒序

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
app.get('/api/products/:productId', (req, res) => {
    try {
        const productId = req.params.productId;
        const files = fs.readdirSync(productsDir);
        
        const productSubmissions = files
            .filter(file => file.startsWith(`${productId}_`) && file.endsWith('.json'))
            .map(file => {
                const filepath = path.join(productsDir, file);
                const content = fs.readFileSync(filepath, 'utf8');
                return JSON.parse(content);
            })
            .sort((a, b) => b.submissionId - a.submissionId); // 按时间倒序

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
app.get('/api/statistics', (req, res) => {
    try {
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

        // 转换为数组并按选择次数排序
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

// 启动服务器（监听所有网络接口，允许局域网访问）
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
    console.log(`\n数据保存目录: ${dataDir}`);
    console.log(`产品分类目录: ${productsDir}`);
    console.log('\n可用API:');
    console.log('  POST /api/submit - 提交问卷');
    console.log('  GET  /api/submissions - 获取所有提交记录');
    console.log('  GET  /api/products/:productId - 获取指定产品的提交记录');
    console.log('  GET  /api/statistics - 获取所有产品的统计信息');
});

