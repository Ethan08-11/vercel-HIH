/**
 * 数据同步脚本
 * 从部署的 MongoDB 数据库同步数据到本地 data 文件夹
 * 
 * 使用方法：
 * 1. 设置环境变量 MONGODB_URI（或创建 .env 文件）
 * 2. 运行: node sync-data.js
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// 配置
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'questionnaire';
const COLLECTION_NAME = 'submissions';
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_DIR = path.join(__dirname, 'data', 'products');

// 确保目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

async function syncData() {
    if (!MONGODB_URI) {
        console.error('❌ 错误: MONGODB_URI 环境变量未设置');
        console.log('\n请设置 MongoDB 连接字符串:');
        console.log('  方法1: 创建 .env 文件，添加: MONGODB_URI=your_connection_string');
        console.log('  方法2: 运行命令: set MONGODB_URI=your_connection_string && node sync-data.js');
        process.exit(1);
    }

    // 简单验证连接字符串格式（仅检查基本格式）
    console.log('🔍 验证连接字符串格式...');
    
    // 基本格式检查
    if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
        console.error('❌ 连接字符串格式错误：应以 mongodb:// 或 mongodb+srv:// 开头');
        process.exit(1);
    }
    
    if (!MONGODB_URI.includes('@')) {
        console.error('❌ 连接字符串格式错误：缺少认证信息（用户名和密码）');
        process.exit(1);
    }
    
    console.log('✅ 连接字符串格式验证通过');

    // 提取连接信息用于诊断
    let hostname = '';
    let port = '';
    try {
        const uriForParsing = MONGODB_URI.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://');
        const url = new URL(uriForParsing);
        hostname = url.hostname;
        port = url.port || MONGODB_URI.match(/:(\d+)\//)?.[1] || '28174';
    } catch (e) {
        // 如果解析失败，尝试从字符串中提取
        const hostMatch = MONGODB_URI.match(/@([^:]+):(\d+)\//);
        if (hostMatch) {
            hostname = hostMatch[1];
            port = hostMatch[2];
        }
    }

    // 网络连接诊断
    console.log('\n🔍 网络连接诊断:');
    console.log(`   主机: ${hostname}`);
    console.log(`   端口: ${port}`);
    
    // 测试 DNS 解析
    if (hostname) {
        const dns = require('dns');
        const { promisify } = require('util');
        const resolve4 = promisify(dns.resolve4);
        
        try {
            console.log('   DNS 解析测试...');
            const addresses = await Promise.race([
                resolve4(hostname),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('DNS解析超时（5秒）')), 5000)
                )
            ]);
            console.log(`   ✅ DNS 解析成功: ${Array.isArray(addresses) ? addresses.join(', ') : addresses}`);
        } catch (dnsError) {
            console.log(`   ⚠️  DNS 解析失败: ${dnsError.message}`);
            console.log('   提示: 可能是网络问题、DNS 问题或主机名不正确');
            console.log('   如果 DNS 解析失败，MongoDB 连接也会失败');
        }
    }

    let client = null;
    
    try {
        console.log('\n🔄 正在连接到 MongoDB...');
        console.log('📍 连接地址:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // 隐藏密码
        
        // MongoDB 连接选项
        const clientOptions = {
            serverSelectionTimeoutMS: 30000, // 30秒超时（增加超时时间）
            connectTimeoutMS: 30000,
            socketTimeoutMS: 60000,
            maxPoolSize: 10,
            retryWrites: true,
            retryReads: true,
            heartbeatFrequencyMS: 10000,
        };
        
        client = new MongoClient(MONGODB_URI, clientOptions);
        
        // 连接字符串验证已简化，不再检查特定端口号
        
        // 尝试连接，设置超时
        console.log('⏳ 尝试连接（最多等待30秒）...');
        await Promise.race([
            client.connect(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('连接超时：无法在30秒内连接到MongoDB服务器')), 30000)
            )
        ]);
        
        // 验证连接
        await client.db('admin').command({ ping: 1 });
        console.log('✅ MongoDB 连接成功');
        
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        
        // 获取所有提交记录
        console.log('📥 正在获取数据...');
        const submissions = await collection
            .find({})
            .sort({ submissionId: -1 })
            .toArray();
        
        console.log(`✅ 找到 ${submissions.length} 条提交记录`);
        
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
        
    } catch (error) {
        console.error('\n❌ 同步失败:', error.message);
        
        // 提供详细的错误诊断
        if (error.message.includes('timeout') || error.message.includes('timed out') || error.name === 'MongoServerSelectionError') {
            console.error('\n🔍 连接超时诊断:');
            
            // 检查端口号
            const portMatch = MONGODB_URI.match(/:(\d+)(\/|$)/);
            if (portMatch) {
                const port = portMatch[1];
                console.error(`\n📋 当前连接信息:`);
                try {
                    const uriForParsing = MONGODB_URI.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://');
                    const url = new URL(uriForParsing);
                    console.error(`  主机: ${url.hostname}`);
                    console.error(`  端口: ${port}`);
                    console.error(`  数据库: ${url.pathname.replace('/', '') || '未指定'}`);
                    console.error(`  认证源: ${url.searchParams.get('authSource') || '未指定'}`);
                    
                    // 验证逻辑已简化，不再检查特定主机名和端口号
                } catch (e) {
                    console.error('  无法解析连接字符串:', e.message);
                }
            }
            
            console.error('\n📝 连接字符串格式:');
            console.error('   mongodb://用户名:密码@主机:端口/数据库名?参数');
            console.error('   或');
            console.error('   mongodb+srv://用户名:密码@主机/数据库名?参数');
            
            console.error('\n可能的原因:');
            console.error('  1. 检查网络连接是否正常');
            console.error('  2. 检查防火墙是否阻止了 MongoDB 端口');
            console.error('  3. 检查公司/学校网络是否有限制');
            console.error('  4. 确认 MongoDB 服务器地址和端口正确');
            console.error('  5. 确认用户名和密码正确');
            
            // 检查连接字符串格式
            if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
                console.error('\n⚠️  连接字符串格式可能不正确');
                console.error('  应该以 mongodb:// 或 mongodb+srv:// 开头');
            }
        } else if (error.message.includes('authentication')) {
            console.error('\n🔍 认证失败诊断:');
            console.error('  1. 检查用户名和密码是否正确');
            console.error('  2. 确认密码中的特殊字符是否已正确编码');
            console.error('  3. 检查数据库权限设置');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('\n🔍 DNS 解析失败诊断:');
            console.error('  1. 检查主机地址是否正确');
            console.error('  2. 检查网络 DNS 设置');
            console.error('  3. 尝试 ping 主机地址');
        }
        
        console.error('\n💡 建议解决方案:');
        console.error('  1. 检查连接字符串是否正确（用户名、密码、主机、端口）');
        console.error('  2. 确认 MongoDB 服务器允许从当前网络访问');
        console.error('  3. 检查网络连接和防火墙设置');
        console.error('  4. 如果使用 MongoDB Atlas，确认 IP 白名单设置');
        console.error('  5. 尝试使用 API 导出数据（如果应用已部署）');
        
        console.error('\n详细错误信息:');
        console.error(error.stack);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('\n🔌 MongoDB 连接已关闭');
        }
    }
}

// 运行同步
console.log('🚀 开始同步数据...\n');
syncData().catch(console.error);

