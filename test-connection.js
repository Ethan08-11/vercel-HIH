/**
 * MongoDB 连接测试脚本
 * 用于诊断连接问题
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    console.error('❌ 错误: MONGODB_URI 环境变量未设置');
    console.log('\n请在 .env 文件中设置 MONGODB_URI');
    process.exit(1);
}

// 显示连接信息（隐藏密码）
const displayUri = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
console.log('🔍 测试 MongoDB 连接...');
console.log('📍 连接字符串:', displayUri);

// 解析连接字符串
try {
    const uriForParsing = MONGODB_URI.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://');
    const url = new URL(uriForParsing);
    console.log('\n📋 连接信息:');
    console.log('  协议:', MONGODB_URI.startsWith('mongodb+srv://') ? 'mongodb+srv' : 'mongodb');
    console.log('  主机:', url.hostname);
    console.log('  端口:', url.port || (MONGODB_URI.startsWith('mongodb+srv://') ? '27017 (SRV)' : '27017 (默认)'));
    console.log('  数据库:', url.pathname.replace('/', '') || '未指定');
    console.log('  认证源:', url.searchParams.get('authSource') || '未指定');
} catch (e) {
    console.warn('⚠️  无法解析连接字符串:', e.message);
}

// 测试连接
const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
});

console.log('\n⏳ 尝试连接（最多等待10秒）...');

const startTime = Date.now();

client.connect()
    .then(async () => {
        const connectTime = Date.now() - startTime;
        console.log(`\n✅ 连接成功！(耗时: ${connectTime}ms)`);
        
        // 测试 ping
        try {
            await client.db('admin').command({ ping: 1 });
            console.log('✅ Ping 测试成功');
        } catch (e) {
            console.warn('⚠️  Ping 测试失败:', e.message);
        }
        
        // 测试数据库访问
        try {
            const db = client.db(process.env.DB_NAME || 'questionnaire');
            const collections = await db.listCollections().toArray();
            console.log(`✅ 数据库访问成功`);
            console.log(`   找到 ${collections.length} 个集合`);
            
            // 检查 submissions 集合
            const submissionsCollection = db.collection('submissions');
            const count = await submissionsCollection.countDocuments();
            console.log(`   提交记录数: ${count}`);
        } catch (e) {
            console.warn('⚠️  数据库访问失败:', e.message);
        }
        
        await client.close();
        console.log('\n🎉 所有测试通过！可以运行 npm run sync 同步数据');
        process.exit(0);
    })
    .catch(err => {
        const connectTime = Date.now() - startTime;
        console.error(`\n❌ 连接失败 (耗时: ${connectTime}ms)`);
        console.error('错误:', err.message);
        
        if (err.message.includes('timeout')) {
            console.error('\n🔍 超时问题诊断:');
            console.error('  1. 检查网络连接');
            console.error('  2. 检查防火墙设置');
            console.error('  3. 确认主机地址和端口正确');
            console.error('  4. 尝试使用不同的网络（如手机热点）');
        } else if (err.message.includes('authentication')) {
            console.error('\n🔍 认证问题诊断:');
            console.error('  1. 检查用户名和密码是否正确');
            console.error('  2. 检查密码中的特殊字符是否已编码');
        } else if (err.message.includes('ENOTFOUND')) {
            console.error('\n🔍 DNS 问题诊断:');
            console.error('  1. 检查主机地址是否正确');
            console.error('  2. 尝试 ping 主机地址');
        }
        
        console.error('\n💡 建议: 如果无法连接，可以使用网页导出功能');
        console.error('  访问: https://questionnaire-app.zeabur.app/统计页面.html');
        process.exit(1);
    });

