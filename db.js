const { MongoClient } = require('mongodb');

// MongoDB 连接配置
const MONGODB_URI = process.env.MONGODB_URI || '';
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

    try {
        // 检测是否为 Zeabur 环境
        const isZeabur = process.env.ZEABUR || 
                        (process.env.NODE_ENV === 'production' && process.env.PORT && process.env.PORT !== '3000');
        
        // 只在首次连接时输出详细信息，避免重复日志
        const isFirstConnection = !client;
        if (isFirstConnection) {
            console.log('🔌 正在连接MongoDB...');
            console.log('   连接字符串长度:', MONGODB_URI.length);
            console.log('   数据库名称:', DB_NAME);
            console.log('   环境:', isZeabur ? 'Zeabur (生产)' : '本地开发');
        }
        
        // 在 Zeabur 上使用更长的超时时间，因为网络可能较慢
        // 但使用 Promise.race 在应用层面控制总超时时间
        const timeout = isZeabur ? 30000 : 30000; // 统一使用30秒，让 MongoDB 驱动自己处理
        
        client = new MongoClient(MONGODB_URI, {
            serverSelectionTimeoutMS: timeout, // 服务器选择超时
            connectTimeoutMS: timeout, // 连接超时
            socketTimeoutMS: 0, // socket超时设为0（不超时），由应用层控制
            maxPoolSize: 10, // 连接池大小
            minPoolSize: 1,
            retryWrites: true, // 启用重试写入
            retryReads: true, // 启用重试读取
            serverSelectionRetryDelay: 1000, // 重试延迟1秒
            heartbeatFrequencyMS: 10000, // 心跳频率10秒
        });
        
        await client.connect();
        db = client.db(DB_NAME);
        
        // 验证连接
        await db.admin().ping();
        console.log('✅ MongoDB 连接成功');
        console.log('   数据库:', DB_NAME);
        return db;
    } catch (error) {
        // 只在首次连接失败时输出详细错误，避免重复日志
        const isFirstConnection = !client || !db;
        if (isFirstConnection) {
            console.error('❌ MongoDB 连接失败:');
            console.error('   错误消息:', error.message);
            console.error('   错误代码:', error.code || 'N/A');
            if (error.name) {
                console.error('   错误类型:', error.name);
            }
            // 只在开发环境输出完整堆栈
            if (process.env.NODE_ENV !== 'production' && error.stack) {
                console.error('   错误堆栈:', error.stack);
            }
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
        // 如果连接失败，尝试重新连接一次
        console.warn('⚠️ 数据库连接失败，尝试重新连接...');
        database = await connectDB();
        if (!database) {
            console.warn('数据库未连接，返回空对象');
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
        // 如果连接失败，尝试重新连接一次
        console.warn('⚠️ 数据库连接失败，尝试重新连接...');
        database = await connectDB();
        if (!database) {
            console.error('❌ 数据库未连接，无法更新爱心数量');
            return null;
        }
    }

    try {
        const collection = database.collection('heartCounts');
        
        // 先检查文档是否存在
        const existing = await collection.findOne({ productId: productId });
        
        let newCount;
        
        if (!existing) {
            // 如果不存在，创建新文档，初始值为随机值(1500-2500)+增量
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
            // 如果存在，使用 $inc 更新（只执行一次更新操作）
            // 先执行更新操作
            const updateResult = await collection.updateOne(
                { productId: productId },
                { 
                    $inc: { count: increment },
                    $set: { updatedAt: new Date() }
                }
            );
            
            // 检查更新是否成功
            if (updateResult.modifiedCount === 1 || updateResult.matchedCount === 1) {
                // 更新成功，查询最新值
                const updated = await collection.findOne({ productId: productId });
                newCount = updated ? updated.count : null;
                if (newCount !== null) {
                    console.log(`✅ 产品 ${productId} 爱心数量已更新: ${increment > 0 ? '+' : ''}${increment}, 新数量: ${newCount}`);
                } else {
                    throw new Error('更新后无法获取新数量');
                }
            } else {
                // 更新失败，尝试使用 findOneAndUpdate 作为备用方法
                const result = await collection.findOneAndUpdate(
                    { productId: productId },
                    { 
                        $inc: { count: increment },
                        $set: { updatedAt: new Date() }
                    },
                    { 
                        returnDocument: 'after'
                    }
                );
                
                if (result && result.value) {
                    newCount = result.value.count;
                    console.log(`✅ 产品 ${productId} 爱心数量已更新（备用方法）: ${increment > 0 ? '+' : ''}${increment}, 新数量: ${newCount}`);
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

// 生成基于产品ID的随机初始值（1500-2500之间）
// 使用产品ID作为种子，确保每个产品的初始值是固定的
function getRandomInitialCount(productId) {
    // 使用简单的伪随机算法，基于产品ID生成固定随机数
    // 这样每个产品的初始值都是固定的，不会每次运行都变化
    const seed = productId * 12345 + 67890;
    const random = Math.sin(seed) * 10000;
    const normalized = (random - Math.floor(random));
    // 生成1500-2500之间的随机数
    return Math.floor(1500 + normalized * 1000);
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
            // 先检查是否已存在，避免覆盖已有数据
            const existing = await collection.findOne({ productId: productId });
            if (!existing) {
                // 生成随机初始值（1500-2500之间）
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
                console.log(`ℹ️ 产品 ${productId} 爱心数量已存在: ${existing.count}`);
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

