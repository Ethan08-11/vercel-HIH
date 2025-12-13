const { MongoClient } = require('mongodb');

// MongoDB 连接配置
// 清理连接字符串：去除首尾空格和换行符
const rawMongoUri = process.env.MONGODB_URI || '';
const MONGODB_URI = rawMongoUri.trim().replace(/\n/g, '').replace(/\r/g, '');
const DB_NAME = process.env.DB_NAME || 'questionnaire';
const COLLECTION_NAME = 'submissions';

let client = null;
let db = null;

// 连接到 MongoDB（带重连机制）
async function connectDB() {
    // 如果已有连接，先检查连接是否有效
    if (db && client) {
        try {
            // 执行一个简单的操作来检查连接是否有效
            await client.db('admin').command({ ping: 1 });
            return db;
        } catch (error) {
            // 连接已断开，重置变量
            console.warn('⚠️ 数据库连接已断开，重新连接...');
            db = null;
            if (client) {
                try {
                    await client.close();
                } catch (e) {
                    // 忽略关闭错误
                }
                client = null;
            }
        }
    }

    if (!MONGODB_URI) {
        console.warn('⚠️ 警告: MONGODB_URI 未设置，将使用文件系统存储（仅本地开发）');
        console.warn('   在Zeabur部署时，请确保在环境变量中配置MONGODB_URI');
        return null;
    }

    // 验证连接字符串格式
    const uriPattern = /^mongodb(\+srv)?:\/\//;
    if (!uriPattern.test(MONGODB_URI)) {
        console.error('❌ MongoDB 连接字符串格式错误！');
        console.error('   连接字符串应以 mongodb:// 或 mongodb+srv:// 开头');
        console.error('   当前连接字符串前20个字符:', MONGODB_URI.substring(0, 20));
        console.error('   连接字符串长度:', MONGODB_URI.length);
        console.error('   原始值（前20个字符）:', rawMongoUri.substring(0, 20));
        console.error('   原始值长度:', rawMongoUri.length);
        // 尝试显示原始值的十六进制表示（前50个字符）
        const hexPreview = Buffer.from(rawMongoUri.substring(0, 50)).toString('hex');
        console.error('   原始值十六进制（前50字符）:', hexPreview);
        return null;
    }

    try {
        // 检测是否为 Zeabur 环境
        const isZeabur = process.env.ZEABUR || 
                        (process.env.NODE_ENV === 'production' && process.env.PORT && process.env.PORT !== '3000');
        
        // 只在首次连接时输出详细信息，避免重复日志
        const isFirstConnection = !client;
        if (isFirstConnection) {
        console.log('🔌 正在连接MongoDB...');
        console.log('   连接字符串长度:', MONGODB_URI.length);
        console.log('   连接字符串前缀:', MONGODB_URI.substring(0, 30) + '...');
        console.log('   连接字符串是否以mongodb开头:', MONGODB_URI.startsWith('mongodb://') || MONGODB_URI.startsWith('mongodb+srv://'));
        console.log('   数据库名称:', DB_NAME);
            console.log('   环境:', isZeabur ? 'Zeabur (生产)' : '本地开发');
            
            // 诊断：检查原始值是否有问题
            if (rawMongoUri !== MONGODB_URI) {
                console.log('   ⚠️ 检测到连接字符串被清理（原始值包含空格或换行符）');
                console.log('   原始值长度:', rawMongoUri.length);
                console.log('   清理后长度:', MONGODB_URI.length);
            }
        }
        
        // 在 Zeabur 上使用更长的超时时间，因为网络可能较慢
        // 但使用 Promise.race 在应用层面控制总超时时间
        const timeout = isZeabur ? 60000 : 30000; // Zeabur上使用60秒，本地30秒
        
        // 连接 MongoDB（带重试机制）
        let lastError = null;
        const maxRetries = isZeabur ? 3 : 1; // Zeabur上重试3次，增加重试次数
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                if (attempt > 1) {
                    console.log(`🔄 重试连接 MongoDB (尝试 ${attempt}/${maxRetries})...`);
                    // 等待一段时间后重试
                    await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
                }
                
                // 创建或重新创建客户端
                if (attempt === 1 || !client) {
                    // 确保连接字符串已清理（再次清理，防止环境变量变化）
                    const cleanUri = MONGODB_URI.trim().replace(/\n/g, '').replace(/\r/g, '');
                    
                    // 验证清理后的连接字符串
                    if (!uriPattern.test(cleanUri)) {
                        throw new Error(`连接字符串格式错误：应以 mongodb:// 或 mongodb+srv:// 开头，实际值前20个字符: ${cleanUri.substring(0, 20)}`);
                    }
                    
        client = new MongoClient(cleanUri, {
                        serverSelectionTimeoutMS: timeout, // 服务器选择超时
            connectTimeoutMS: timeout, // 连接超时
                        socketTimeoutMS: isZeabur ? 120000 : 60000, // Zeabur上120秒，本地60秒（处理incomplete read错误）
            maxPoolSize: 10, // 连接池大小
            minPoolSize: 1,
            retryWrites: true, // 启用重试写入
            retryReads: true, // 启用重试读取
                        heartbeatFrequencyMS: 10000, // 心跳频率10秒
                        // 增加连接池选项，提高稳定性
                        maxIdleTimeMS: 30000, // 空闲连接30秒后关闭
                        waitQueueTimeoutMS: 10000, // 等待连接池连接的超时时间
                    });
                }
                
                // 在 Zeabur 上，使用应用层超时控制（60秒）
                if (isZeabur) {
                    const connectPromise = client.connect();
                    const timeoutPromise = new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('MongoDB连接超时（60秒）')), timeout)
                    );
                    await Promise.race([connectPromise, timeoutPromise]);
                } else {
        await client.connect();
                }
                
        db = client.db(DB_NAME);
        
                // 验证连接（必须成功才能继续）
        await db.admin().ping();
                
                if (isFirstConnection || attempt > 1) {
        console.log('✅ MongoDB 连接成功');
        console.log('   数据库:', DB_NAME);
                    if (attempt > 1) {
                        console.log(`   重试 ${attempt - 1} 次后成功连接`);
                    }
                }
                
        return db;
            } catch (connectError) {
                lastError = connectError;
                if (isFirstConnection || attempt === 1) {
                    console.warn(`⚠️ MongoDB 连接失败 (尝试 ${attempt}/${maxRetries}):`, connectError.message);
                }
                
                // 如果不是最后一次尝试，关闭失败的连接并准备重试
                if (attempt < maxRetries) {
                    if (client) {
                        try {
                            await client.close();
                        } catch (e) {
                            // 忽略关闭错误
                        }
                        client = null;
                    }
                }
            }
        }
        
        // 所有重试都失败，抛出最后一个错误
        throw lastError;
    } catch (error) {
        // 只在首次连接失败时输出详细错误，避免重复日志
        const isFirstConnection = !client || !db;
        if (isFirstConnection) {
            // 检测是否为本地开发环境
            const isLocalDev = !process.env.ZEABUR && 
                              (process.env.NODE_ENV !== 'production' || !process.env.PORT || process.env.PORT === '3000');
            
            console.error('\n' + '='.repeat(60));
            console.error('⚠️  MongoDB 连接失败');
            console.error('='.repeat(60));
            console.error('   错误消息:', error.message);
            console.error('   错误代码:', error.code || 'N/A');
            if (error.name) {
                console.error('   错误类型:', error.name);
            }
            
            // 如果是本地开发环境，提供更友好的提示
            if (isLocalDev) {
                console.error('\n📌 本地开发环境提示:');
                console.error('   这是正常的！本地开发环境通常无法直接连接到 Zeabur MongoDB。');
                console.error('   应用会自动使用文件系统存储，所有功能仍然正常工作。');
            }
            
            // 提供诊断信息
            console.error('\n📋 诊断信息:');
            console.error('   MONGODB_URI:', MONGODB_URI ? `已配置 (长度: ${MONGODB_URI.length})` : '❌ 未配置');
            if (MONGODB_URI) {
                // 检查连接字符串格式（不输出完整字符串，只检查格式）
                const uriPattern = /^mongodb(\+srv)?:\/\//;
                if (!uriPattern.test(MONGODB_URI)) {
                    console.error('   ⚠️ 连接字符串格式可能不正确（应以 mongodb:// 或 mongodb+srv:// 开头）');
                }
                // 检查是否包含必要的部分
                if (!MONGODB_URI.includes('@')) {
                    console.error('   ⚠️ 连接字符串可能缺少认证信息');
                }
            }
            console.error('   数据库名称:', DB_NAME);
            console.error('   环境:', process.env.NODE_ENV || 'development');
            console.error('   端口:', process.env.PORT || '3000');
            
            // 常见错误提示
            if (error.message.includes('ECONNRESET') || error.code === 'ECONNRESET') {
                console.error('\n💡 ECONNRESET 错误说明:');
                console.error('   这是网络连接被重置的错误，通常发生在以下情况:');
                console.error('   1. 本地开发环境尝试连接 Zeabur MongoDB（最常见）');
                console.error('     → Zeabur MongoDB 只允许从 Zeabur 内部网络访问');
                console.error('     → 本地计算机无法直接连接，这是正常的安全设置');
                console.error('   2. 网络不稳定或防火墙阻止连接');
                console.error('   3. MongoDB 服务器主动关闭了连接');
                console.error('\n✅ 解决方案:');
                console.error('   - 在本地开发时，应用会自动使用文件系统存储');
                console.error('   - 所有功能仍然正常工作，数据保存在 data/ 目录');
                console.error('   - 在 Zeabur 生产环境中，连接会自动成功');
                console.error('   - 如果需要同步数据，可以使用 API 导出: npm run sync-api');
            } else if (error.message.includes('timeout') || error.message.includes('timed out') || 
                       error.message.includes('incomplete read') || error.message.includes('i/o timeout')) {
                console.error('\n💡 可能的原因:');
                console.error('   1. MongoDB 服务器不可达（网络问题、防火墙阻止）');
                console.error('   2. MongoDB 服务器地址或端口错误（最常见）');
                console.error('     → 检查环境变量 MONGODB_URI 中的端口号是否与 MongoDB 服务页面显示的端口号一致');
                console.error('     → 错误信息中显示的端口号（如 :25167）就是 MongoDB 实际使用的端口号');
                console.error('   3. 网络延迟过高，超过超时限制');
                console.error('   4. MongoDB 服务器未运行或已关闭');
                console.error('   5. 本地开发环境无法连接 Zeabur MongoDB（这是正常的）');
                console.error('\n🔧 解决方案:');
                console.error('   1. 在 Zeabur MongoDB 服务页面，复制完整的连接字符串');
                console.error('   2. 更新环境变量 MONGODB_URI，确保端口号正确');
                console.error('   3. 等待 MongoDB 服务完全启动（1-3分钟）');
                console.error('   4. 查看详细排查指南: Zeabur_MongoDB连接问题排查.md');
            } else if (error.message.includes('authentication') || error.message.includes('auth')) {
                console.error('\n💡 可能的原因:');
                console.error('   1. MongoDB 用户名或密码错误');
                console.error('   2. 用户没有访问该数据库的权限');
            } else if (error.message.includes('ENOTFOUND') || error.message.includes('DNS')) {
                console.error('\n💡 可能的原因:');
                console.error('   1. MongoDB 服务器地址无法解析（DNS问题）');
                console.error('   2. 连接字符串中的主机名错误');
            } else if (error.message.includes('ECONNREFUSED') || error.code === 'ECONNREFUSED') {
                console.error('\n💡 ECONNREFUSED 错误说明:');
                console.error('   连接被拒绝，可能的原因:');
                console.error('   1. MongoDB 服务器未运行或端口错误');
                console.error('   2. 防火墙阻止了连接');
                console.error('   3. 本地开发环境无法连接 Zeabur MongoDB（这是正常的）');
            } else if (error.message.includes('connection pool') || error.message.includes('incomplete read')) {
                console.error('\n💡 连接池错误说明:');
                console.error('   这是 "incomplete read of message header" 或 "connection pool cleared" 错误');
                console.error('   通常发生在以下情况:');
                console.error('   1. MongoDB 端口号配置错误（最常见）');
                
                // 尝试从错误信息中提取端口号
                const portMatch = error.message.match(/:(\d{4,5})/);
                if (portMatch) {
                    const detectedPort = portMatch[1];
                    console.error(`\n   ⚠️  检测到错误信息中的端口号: ${detectedPort}`);
                    console.error('     → 这个端口号就是 MongoDB 实际使用的端口号');
                    
                    // 尝试从 MONGODB_URI 中提取当前配置的端口号
                    const currentPortMatch = MONGODB_URI.match(/:(\d{4,5})\//);
                    if (currentPortMatch) {
                        const currentPort = currentPortMatch[1];
                        if (currentPort !== detectedPort) {
                            console.error(`     → 当前环境变量中的端口号: ${currentPort}`);
                            console.error(`     → 端口号不匹配！需要将 ${currentPort} 改为 ${detectedPort}`);
                            console.error('\n   🔧 快速修复:');
                            console.error(`     在 Zeabur 环境变量中，将 MONGODB_URI 中的端口号从 ${currentPort} 改为 ${detectedPort}`);
                        } else {
                            console.error(`     → 当前环境变量中的端口号: ${currentPort}（已匹配）`);
                            console.error('     → 端口号匹配，可能是其他问题（服务未启动、网络问题等）');
                        }
                    }
                }
                
                console.error('   2. MongoDB 服务未完全启动（等待 1-3 分钟）');
                console.error('   3. 网络不稳定导致连接中断');
                console.error('\n🔧 解决方案:');
                console.error('   1. 在 Zeabur MongoDB 服务页面，查看 "MongoDB connection string"');
                console.error('   2. 复制完整的连接字符串（包含正确的端口号）');
                console.error('   3. 更新环境变量 MONGODB_URI');
                console.error('   4. 等待服务重新部署完成');
                console.error('   5. 查看详细排查指南: Zeabur_MongoDB连接问题排查.md');
            }
            
            // 只在开发环境输出完整堆栈
            if (process.env.NODE_ENV !== 'production' && error.stack) {
                console.error('\n   错误堆栈:', error.stack);
            }
            
            // 添加总结信息
            console.error('\n' + '='.repeat(60));
            console.error('✅ 应用将继续运行，使用本地文件系统存储');
            console.error('   数据将保存在 data/ 目录');
            if (isLocalDev) {
                console.error('   在 Zeabur 生产环境中，MongoDB 连接会自动成功');
            }
            console.error('='.repeat(60) + '\n');
        } else {
            // 非首次连接失败，只输出简要信息
            console.warn('⚠️ MongoDB 重连失败:', error.message);
        }
        
        db = null;
        if (client) {
            try {
                await client.close();
            } catch (e) {
                // 忽略关闭错误
            }
            client = null;
        }
        return null;
    }
}

// 断开连接
async function disconnectDB() {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log('MongoDB 连接已关闭');
    }
}

// 保存提交记录
async function saveSubmission(productRecord) {
    const database = await connectDB();
    if (!database) {
        return null;
    }

    try {
        const collection = database.collection(COLLECTION_NAME);
        const result = await collection.insertOne(productRecord);
        console.log(`✅ 产品 ${productRecord.productName} (ID: ${productRecord.productId}) 的提交已保存到数据库`);
        return result.insertedId;
    } catch (error) {
        console.error('保存提交记录时出错:', error);
        throw error;
    }
}

// 获取所有提交记录
async function getAllSubmissions() {
    const database = await connectDB();
    if (!database) {
        return [];
    }

    try {
        const collection = database.collection(COLLECTION_NAME);
        const submissions = await collection
            .find({})
            .sort({ submissionId: -1 })
            .toArray();
        return submissions;
    } catch (error) {
        console.error('获取提交记录时出错:', error);
        return [];
    }
}

// 获取指定产品的提交记录
async function getProductSubmissions(productId) {
    const database = await connectDB();
    if (!database) {
        return [];
    }

    try {
        const collection = database.collection(COLLECTION_NAME);
        const submissions = await collection
            .find({ productId: parseInt(productId) })
            .sort({ submissionId: -1 })
            .toArray();
        return submissions;
    } catch (error) {
        console.error('获取产品提交记录时出错:', error);
        return [];
    }
}

// 获取所有产品的爱心数量
async function getHeartCounts() {
    // 确保数据库连接
    let database = await connectDB();
    if (!database) {
        // 如果连接失败，尝试重新连接一次（静默重试，避免过多日志）
        database = await connectDB();
        if (!database) {
            // 静默返回空对象，不输出警告（避免重复日志）
            return {};
        }
    }

    try {
        const collection = database.collection('heartCounts');
        const counts = await collection.find({}).toArray();
        const result = {};
        counts.forEach(item => {
            result[item.productId] = item.count;
        });
        console.log(`从数据库获取到 ${Object.keys(result).length} 个产品的爱心数量:`, result);
        return result;
    } catch (error) {
        console.error('获取爱心数量时出错:', error);
        return {};
    }
}

// 更新产品的爱心数量（同时记录点击历史）
async function updateHeartCount(productId, increment, userInfo = {}) {
    // 确保数据库连接
    let database = await connectDB();
    if (!database) {
        // 如果连接失败，尝试重新连接一次（静默重试）
        database = await connectDB();
        if (!database) {
            // 静默返回null，由调用者处理错误（避免重复日志）
            return null;
        }
    }

    try {
        const collection = database.collection('heartCounts');
        
        // 先检查文档是否存在
        const existing = await collection.findOne({ productId: productId });
        
        let newCount;
        
        if (!existing) {
            // 如果不存在，创建新文档，初始值为2000+增量
            const randomInitial = getRandomInitialCount(productId);
            const initialCount = randomInitial + increment;
            const result = await collection.insertOne({
                productId: productId,
                count: initialCount,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            if (result.insertedId) {
                newCount = initialCount;
                console.log(`✅ 产品 ${productId} 创建新记录，初始数量: ${newCount}`);
            } else {
                throw new Error('插入新文档失败');
            }
        } else {
            // 如果存在，检查当前值是否为初始值（<=2500）
            // 如果是初始值，先重置为2000，然后再增加
            const currentCount = existing.count;
            let baseCount = currentCount;
            
            if (currentCount <= 2500) {
                // 当前值是初始值，重置为2000
                baseCount = 2000;
                console.log(`🔄 产品 ${productId} 当前值 ${currentCount} 是初始值，重置为2000`);
            }
            
            // 计算新值
            const targetCount = baseCount + increment;
            
            // 执行更新操作
            const updateResult = await collection.updateOne(
                { productId: productId },
                { 
                    $set: { 
                        count: targetCount,
                        updatedAt: new Date() 
                    }
                }
            );
            
            // 检查更新是否成功
            if (updateResult.modifiedCount === 1 || updateResult.matchedCount === 1) {
                // 更新成功，查询最新值
                const updated = await collection.findOne({ productId: productId });
                newCount = updated ? updated.count : null;
                if (newCount !== null) {
                    console.log(`✅ 产品 ${productId} 爱心数量已更新: ${currentCount <= 2500 ? `重置为2000后` : ''}${increment > 0 ? '+' : ''}${increment}, 新数量: ${newCount}`);
                } else {
                    throw new Error('更新后无法获取新数量');
                }
            } else {
                // 更新失败，尝试使用 findOneAndUpdate 作为备用方法
                const result = await collection.findOneAndUpdate(
                    { productId: productId },
                    { 
                        $set: { 
                            count: targetCount,
                            updatedAt: new Date() 
                        }
                    },
                    { 
                        returnDocument: 'after'
                    }
                );
                
                if (result && result.value) {
                    newCount = result.value.count;
                    console.log(`✅ 产品 ${productId} 爱心数量已更新（备用方法）: ${currentCount <= 2500 ? `重置为2000后` : ''}${increment > 0 ? '+' : ''}${increment}, 新数量: ${newCount}`);
                } else {
                    throw new Error('所有更新方法都失败');
                }
            }
        }
        
        // 记录点击历史（异步执行，不阻塞主流程）
        recordHeartClick(productId, increment, userInfo).catch(err => {
            console.error('记录点击历史失败（不影响主流程）:', err);
        });
        
        return newCount;
    } catch (error) {
        console.error(`❌ 更新产品 ${productId} 爱心数量时出错:`, error);
        console.error('错误详情:', error.message);
        console.error('错误堆栈:', error.stack);
        // 不抛出错误，返回null，让调用者处理
        return null;
    }
}

// 获取产品的初始爱心数量（服务器端统一为2000）
function getRandomInitialCount(productId) {
    // 服务器端所有产品的初始爱心数量统一为2000
    return 2000;
}

// 初始化所有产品的爱心数量（如果不存在）
async function initHeartCounts(productIds) {
    // 确保数据库连接
    let database = await connectDB();
    if (!database) {
        console.warn('⚠️ 数据库未连接，无法初始化爱心数量');
        return;
    }

    try {
        const collection = database.collection('heartCounts');
        
        for (const productId of productIds) {
            // 先检查是否已存在
            const existing = await collection.findOne({ productId: productId });
            if (!existing) {
                // 生成初始值（统一为2000）
                const initialCount = getRandomInitialCount(productId);
                // 只有不存在时才创建
                await collection.insertOne({
                    productId: productId,
                    count: initialCount,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                console.log(`✅ 产品 ${productId} 爱心数量已初始化: ${initialCount}`);
            } else {
                // 如果已存在，检查是否为初始值（<=2500），如果是则重置为2000
                const currentCount = existing.count;
                if (currentCount <= 2500) {
                    await collection.updateOne(
                        { productId: productId },
                        { 
                            $set: { 
                                count: 2000,
                                updatedAt: new Date() 
                            }
                        }
                    );
                    console.log(`🔄 产品 ${productId} 爱心数量已重置: ${currentCount} -> 2000`);
                } else {
                    console.log(`ℹ️ 产品 ${productId} 爱心数量已存在（用户已点击）: ${existing.count}`);
                }
            }
        }
        console.log('✅ 所有产品爱心数量初始化完成');
    } catch (error) {
        console.error('❌ 初始化爱心数量时出错:', error);
        throw error; // 抛出错误，让调用者知道初始化失败
    }
}

// 记录每次点击的详细信息（用于数据持久化和分析）
async function recordHeartClick(productId, increment, userInfo = {}) {
    const database = await connectDB();
    if (!database) {
        return null;
    }

    try {
        const collection = database.collection('heartClicks');
        
        const clickRecord = {
            productId: productId,
            increment: increment,
            timestamp: new Date(),
            createdAt: new Date(),
            userAgent: userInfo.userAgent || '',
            ip: userInfo.ip || '',
            sessionId: userInfo.sessionId || ''
        };
        
        const result = await collection.insertOne(clickRecord);
        console.log(`记录产品 ${productId} 的点击: ${increment > 0 ? '+' : ''}${increment}`);
        return result.insertedId;
    } catch (error) {
        console.error('记录点击信息时出错:', error);
        // 即使记录失败，也不影响主流程
        return null;
    }
}

module.exports = {
    connectDB,
    disconnectDB,
    saveSubmission,
    getAllSubmissions,
    getProductSubmissions,
    getHeartCounts,
    updateHeartCount,
    initHeartCounts,
    recordHeartClick,
    getRandomInitialCount
};

