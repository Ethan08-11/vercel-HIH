/**
 * 通过 API 同步数据脚本
 * 从部署的应用 API 导出数据到本地 data 文件夹
 * 
 * 使用方法：
 * 1. 确保应用已部署到 Zeabur
 * 2. 运行: node sync-data-api.js
 * 
 * 注意：此方法不需要直接连接 MongoDB，适用于本地无法连接 MongoDB 的情况
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const API_URL = process.env.API_URL || 'https://questionnaire-app.zeabur.app/api/export';
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_DIR = path.join(__dirname, 'data', 'products');

// 确保目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

function downloadData(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        console.log(`📥 正在从 API 下载数据...`);
        console.log(`📍 API 地址: ${url}`);
        
        const request = client.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }
            
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (e) {
                    reject(new Error(`解析 JSON 失败: ${e.message}`));
                }
            });
        });
        
        request.on('error', (error) => {
            reject(new Error(`请求失败: ${error.message}`));
        });
        
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('请求超时（30秒）'));
        });
    });
}

async function syncDataFromAPI() {
    try {
        // 下载数据
        const data = await downloadData(API_URL);
        
        if (!data.submissions || !Array.isArray(data.submissions)) {
            throw new Error('API 返回的数据格式不正确：缺少 submissions 数组');
        }
        
        const submissions = data.submissions;
        console.log(`✅ 成功下载 ${submissions.length} 条提交记录`);
        
        if (submissions.length === 0) {
            console.log('⚠️  没有数据需要同步');
            return;
        }
        
        // 统计信息
        let savedCount = 0;
        let skippedCount = 0;
        
        // 按产品分类保存（模拟原始文件结构）
        for (const submission of submissions) {
            const productId = submission.productId;
            const productName = submission.productName || `产品${productId}`;
            const submissionId = submission.submissionId || Date.now();
            
            // 生成文件名（与原始格式一致）
            const filename = `${productId}_${productName}_${submissionId}.json`;
            const filepath = path.join(DATA_DIR, filename);
            const productFilepath = path.join(PRODUCTS_DIR, filename);
            
            // 检查文件是否已存在（避免重复下载）
            if (fs.existsSync(filepath)) {
                skippedCount++;
                continue;
            }
            
            // 准备保存的数据（与原始格式一致）
            const record = {
                submissionId: submissionId,
                productId: productId,
                productName: productName,
                productImage: submission.productImage,
                answers: submission.answers,
                selectedProducts: submission.selectedProducts,
                timestamp: submission.timestamp,
                submittedAt: submission.submittedAt || submission.createdAt
            };
            
            // 保存到 data 目录
            fs.writeFileSync(
                filepath,
                JSON.stringify(record, null, 2),
                'utf8'
            );
            
            // 保存到 products 目录
            fs.writeFileSync(
                productFilepath,
                JSON.stringify(record, null, 2),
                'utf8'
            );
            
            savedCount++;
            console.log(`  ✓ 已保存: ${filename}`);
        }
        
        // 生成统计文件
        const statistics = {};
        submissions.forEach(submission => {
            const productId = submission.productId;
            if (!statistics[productId]) {
                statistics[productId] = {
                    productId: productId,
                    productName: submission.productName,
                    count: 0,
                    submissions: []
                };
            }
            statistics[productId].count++;
            statistics[productId].submissions.push({
                submissionId: submission.submissionId,
                submittedAt: submission.submittedAt || submission.createdAt
            });
        });
        
        const statisticsPath = path.join(DATA_DIR, 'statistics.json');
        fs.writeFileSync(
            statisticsPath,
            JSON.stringify({
                lastSync: new Date().toISOString(),
                lastSyncLocal: new Date().toLocaleString('zh-CN'),
                syncMethod: 'API',
                apiUrl: API_URL,
                totalSubmissions: submissions.length,
                statistics: Object.values(statistics).sort((a, b) => b.count - a.count)
            }, null, 2),
            'utf8'
        );
        
        console.log('\n📊 同步完成！');
        console.log(`  ✅ 新保存: ${savedCount} 个文件`);
        console.log(`  ⏭️  已跳过: ${skippedCount} 个文件（已存在）`);
        console.log(`  📁 数据目录: ${DATA_DIR}`);
        console.log(`  📁 产品目录: ${PRODUCTS_DIR}`);
        console.log(`  📄 统计文件: ${statisticsPath}`);
        console.log(`  🔗 数据来源: API (${API_URL})`);
        
    } catch (error) {
        console.error('\n❌ 同步失败:', error.message);
        
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('\n🔍 DNS 解析失败:');
            console.error('  1. 检查 API URL 是否正确');
            console.error('  2. 检查网络连接是否正常');
            console.error('  3. 检查应用是否已正确部署到 Zeabur');
        } else if (error.message.includes('timeout') || error.message.includes('超时')) {
            console.error('\n🔍 请求超时:');
            console.error('  1. 检查网络连接是否正常');
            console.error('  2. 检查 API 服务是否正常运行');
            console.error('  3. 尝试增加超时时间');
        } else if (error.message.includes('HTTP')) {
            console.error('\n🔍 HTTP 错误:');
            console.error('  1. 检查 API URL 是否正确');
            console.error('  2. 检查应用是否已正确部署');
            console.error('  3. 检查 API 路由 /api/export 是否存在');
        }
        
        console.error('\n💡 建议解决方案:');
        console.error('  1. 确认应用已部署到 Zeabur');
        console.error('  2. 确认 API URL 正确: ' + API_URL);
        console.error('  3. 在浏览器中访问 API URL 测试是否正常');
        console.error('  4. 检查 Zeabur 服务状态');
        
        console.error('\n详细错误信息:');
        console.error(error.stack);
        process.exit(1);
    }
}

// 运行同步
console.log('🚀 开始通过 API 同步数据...\n');
console.log('💡 提示: 此方法不需要直接连接 MongoDB，适用于本地无法连接的情况\n');
syncDataFromAPI().catch(console.error);
