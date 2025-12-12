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

    // 验证连接字符串格式
    console.log('🔍 验证连接字符串格式...');
    
    // 检查常见错误
    const issues = [];
    
    // 提取主机名进行更精确的检查
    let detectedHostname = '';
    try {
        const uriForParsing = MONGODB_URI.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://');
        const url = new URL(uriForParsing);
        detectedHostname = url.hostname;
    } catch (e) {
        // 如果无法解析，使用字符串匹配
    }
    
    // 检查主机名拼写错误（多种可能的拼写错误）
    const hostnamePatterns = [
        { wrong: 'sjcl.clusters.zeabur.com', correct: 'sjc1.clusters.zeabur.com', desc: '字母l应该是数字1' },
        { wrong: 'sjcI.clusters.zeabur.com', correct: 'sjc1.clusters.zeabur.com', desc: '字母I应该是数字1' },
        { wrong: 'sjcL.clusters.zeabur.com', correct: 'sjc1.clusters.zeabur.com', desc: '字母L应该是数字1' },
    ];
    
    // 使用字符串匹配和URL解析两种方式检查
    for (const pattern of hostnamePatterns) {
        if (MONGODB_URI.includes(pattern.wrong) || detectedHostname === pattern.wrong) {
            issues.push({
                type: 'hostname_typo',
                message: `主机名拼写错误：${pattern.wrong}`,
                fix: `应该为 ${pattern.correct}（${pattern.desc}）`,
                correct: MONGODB_URI.replace(new RegExp(pattern.wrong.replace(/\./g, '\\.'), 'g'), pattern.correct)
            });
            break; // 只报告第一个错误
        }
    }
    
    // 额外检查：如果主机名包含 sjc 但不是 sjc1，也提示
    if (!issues.some(i => i.type === 'hostname_typo')) {
        if (detectedHostname && detectedHostname.includes('sjc') && !detectedHostname.includes('sjc1.clusters.zeabur.com')) {
            if (detectedHostname.includes('sjcl') || detectedHostname.includes('sjcI') || detectedHostname.includes('sjcL')) {
                // 已经在上面检查过了，跳过
            } else if (detectedHostname.includes('clusters.zeabur.com')) {
                issues.push({
                    type: 'hostname_typo',
                    message: `主机名可能不正确：${detectedHostname}`,
                    fix: '应该为 sjc1.clusters.zeabur.com（注意是数字1，不是字母l）',
                    correct: MONGODB_URI.replace(detectedHostname, 'sjc1.clusters.zeabur.com')
                });
            }
        }
    }
    
    // 检查是否缺少数据库名称和authSource
    if (!MONGODB_URI.includes('/questionnaire') && !MONGODB_URI.includes('/admin') && !MONGODB_URI.includes('/test')) {
        issues.push({
            type: 'missing_database',
            message: '连接字符串缺少数据库名称',
            fix: '应该在端口号后添加 /questionnaire?authSource=admin',
            correct: MONGODB_URI.replace(/:28174$/, ':28174/questionnaire?authSource=admin')
        });
    }
    
    // 检查是否缺少authSource参数
    if (MONGODB_URI.includes('/questionnaire') && !MONGODB_URI.includes('authSource')) {
        issues.push({
            type: 'missing_authSource',
            message: '连接字符串缺少 authSource 参数',
            fix: '应该在数据库名称后添加 ?authSource=admin',
            correct: MONGODB_URI.replace(/\/questionnaire$/, '/questionnaire?authSource=admin')
        });
    }
    
    // 如果有问题，显示并修复
    if (issues.length > 0) {
        console.error('\n' + '='.repeat(70));
        console.error('❌ 检测到连接字符串配置错误！');
        console.error('='.repeat(70) + '\n');
        
        issues.forEach((issue, index) => {
            console.error(`问题 ${index + 1}: ${issue.message}`);
            console.error(`   原因: ${issue.fix}`);
            console.error(`   当前值: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`);
            console.error(`   正确值: ${issue.correct.replace(/:[^:@]+@/, ':****@')}`);
            console.error('');
        });
        
        console.error('💡 修复步骤:');
        console.error('   1. 打开项目根目录的 .env 文件');
        console.error('   2. 找到 MONGODB_URI 这一行');
        console.error('   3. 将主机名从 sjcl 改为 sjc1（注意：是数字1，不是字母l）');
        console.error('   4. 确保连接字符串格式完整');
        console.error('   5. 保存文件后重新运行命令');
        console.error('\n📝 正确的 .env 文件内容:');
        console.error('   MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin');
        console.error('   DB_NAME=questionnaire');
        console.error('\n⚠️  重要提示:');
        console.error('   - 主机名必须是 sjc1（数字1），不能是 sjcl（字母l）');
        console.error('   - 端口号必须是 28174');
        console.error('   - 必须包含 /questionnaire?authSource=admin');
        console.error('\n🔧 快速修复命令（Windows PowerShell）:');
        console.error('   在项目根目录运行以下命令来修复 .env 文件:');
        console.error('   (Get-Content .env) -replace "sjcl\\.clusters", "sjc1.clusters" | Set-Content .env');
        console.error('\n' + '='.repeat(70));
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
        
        // 检查连接字符串中的端口号
        const portMatch = MONGODB_URI.match(/:(\d+)\//);
        if (portMatch) {
            const detectedPort = portMatch[1];
            if (detectedPort === '23654') {
                console.warn('⚠️  警告: 检测到旧端口号 23654');
                console.warn('   当前服务器端口应为 28174');
                console.warn('   请更新 .env 文件中的 MONGODB_URI');
                console.warn('   正确格式: mongodb://mongo:密码@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin');
            }
        }
        
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
                    
                    // 检查主机名拼写错误（多种可能的错误）
                    const wrongHostnames = ['sjcl.clusters.zeabur.com', 'sjcI.clusters.zeabur.com', 'sjcL.clusters.zeabur.com'];
                    if (wrongHostnames.includes(url.hostname)) {
                        console.error('\n' + '='.repeat(70));
                        console.error('❌ 主机名拼写错误！这是导致连接失败的主要原因！');
                        console.error('='.repeat(70));
                        console.error(`  当前主机: ${url.hostname} (错误：使用了字母l/I/L)`);
                        console.error('  正确主机: sjc1.clusters.zeabur.com (正确：数字1)');
                        console.error('\n💡 解决方案:');
                        console.error('  1. 打开项目根目录的 .env 文件');
                        console.error('  2. 找到 MONGODB_URI 这一行');
                        console.error('  3. 将 sjcl 改为 sjc1（注意：是数字1，不是字母l）');
                        console.error('  4. 保存文件后重新运行命令');
                        console.error('\n🔧 快速修复命令（Windows PowerShell）:');
                        console.error('   (Get-Content .env) -replace "sjcl\\.clusters", "sjc1.clusters" | Set-Content .env');
                        console.error('='.repeat(70) + '\n');
                    }
                    
                    // 检查端口号
                    if (port === '23654') {
                        console.error('\n❌ 端口号错误！');
                        console.error('  当前端口: 23654 (旧端口)');
                        console.error('  正确端口: 28174 (当前服务器端口)');
                        console.error('\n💡 解决方案:');
                        console.error('  在 .env 文件中将端口号从 23654 改为 28174');
                    }
                    
                    // 检查是否缺少数据库名称
                    if (!url.pathname || url.pathname === '/') {
                        console.error('\n❌ 缺少数据库名称！');
                        console.error('  连接字符串应该在端口号后包含 /questionnaire');
                        console.error('\n💡 解决方案:');
                        console.error('  在 .env 文件中，确保连接字符串包含 /questionnaire?authSource=admin');
                    }
                    
                    // 检查是否缺少authSource
                    if (!url.searchParams.get('authSource')) {
                        console.error('\n❌ 缺少 authSource 参数！');
                        console.error('  连接字符串应该包含 ?authSource=admin');
                        console.error('\n💡 解决方案:');
                        console.error('  在 .env 文件中，确保连接字符串包含 ?authSource=admin');
                    }
                } catch (e) {
                    console.error('  无法解析连接字符串:', e.message);
                }
            }
            
            console.error('\n📝 正确的连接字符串格式:');
            console.error('   mongodb://mongo:密码@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin');
            console.error('\n   注意:');
            console.error('   - 主机名是 sjc1（数字1），不是 sjcl（字母l）');
            console.error('   - 端口号是 28174，不是 23654');
            console.error('   - 必须包含 /questionnaire 和 ?authSource=admin');
            
            console.error('\n其他可能的原因:');
            console.error('  1. Zeabur MongoDB 可能只允许从 Zeabur 内部网络访问（最常见）');
            console.error('     → 这是云服务的安全设置，防止外部直接访问数据库');
            console.error('     → 本地计算机无法直接连接到 Zeabur 的 MongoDB');
            console.error('  2. 检查网络连接是否正常');
            console.error('  3. 检查防火墙是否阻止了 MongoDB 端口 28174');
            console.error('  4. 检查公司/学校网络是否有限制');
            console.error('  5. 本地可能无法直接连接，需要使用 API 导出数据');
            
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
        console.error('');
        console.error('  方案1: 使用 API 导出数据（强烈推荐，最可靠）');
        console.error('    Zeabur MongoDB 通常只允许从 Zeabur 内部网络访问，');
        console.error('    本地计算机无法直接连接。使用 API 是最佳解决方案。');
        console.error('');
        console.error('    方法A - 使用 curl 命令:');
        console.error('      curl https://questionnaire-app.zeabur.app/api/export -o data.json');
        console.error('');
        console.error('    方法B - 使用浏览器:');
        console.error('      1. 打开浏览器访问: https://questionnaire-app.zeabur.app/api/export');
        console.error('      2. 保存返回的 JSON 数据到 data.json 文件');
        console.error('');
        console.error('    方法C - 使用 PowerShell:');
        console.error('      Invoke-WebRequest -Uri https://questionnaire-app.zeabur.app/api/export -OutFile data.json');
        console.error('');
        console.error('  方案2: 检查网络连接（如果必须直接连接）');
        console.error('    → 确认主机名正确: sjc1.clusters.zeabur.com（不是 sjcl）');
        console.error('    → 确认端口号正确: 28174');
        console.error('    → 检查防火墙是否阻止了端口 28174');
        console.error('    → 检查公司/学校网络是否有限制');
        console.error('    → 尝试使用 VPN 或更换网络环境');
        console.error('');
        console.error('  方案3: 在 Zeabur 服务器上运行同步脚本');
        console.error('    → 如果需要在 Zeabur 上运行，可以在 Zeabur 的终端中执行');
        console.error('    → 或者创建一个 Zeabur 服务来定期同步数据');
        
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

