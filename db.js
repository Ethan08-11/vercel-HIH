const { MongoClient } = require('mongodb');

// MongoDB 连接配置
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'questionnaire';
const COLLECTION_NAME = 'submissions';

let client = null;
let db = null;

// 连接到 MongoDB
async function connectDB() {
    if (db) {
        return db;
    }

    if (!MONGODB_URI) {
        console.warn('警告: MONGODB_URI 未设置，将使用文件系统存储（仅本地开发）');
        return null;
    }

    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('✅ MongoDB 连接成功');
        return db;
    } catch (error) {
        console.error('❌ MongoDB 连接失败:', error.message);
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

// 获取统计信息
async function getStatistics() {
    const database = await connectDB();
    if (!database) {
        return [];
    }

    try {
        const collection = database.collection(COLLECTION_NAME);
        
        // 使用聚合管道统计每个产品的数量
        const statistics = await collection.aggregate([
            {
                $group: {
                    _id: '$productId',
                    productName: { $first: '$productName' },
                    count: { $sum: 1 },
                    submissions: {
                        $push: {
                            submissionId: '$submissionId',
                            submittedAt: '$submittedAt'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                    productName: 1,
                    count: 1,
                    submissions: 1
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        return statistics;
    } catch (error) {
        console.error('获取统计信息时出错:', error);
        return [];
    }
}

// 获取所有产品的爱心数量
async function getHeartCounts() {
    const database = await connectDB();
    if (!database) {
        return {};
    }

    try {
        const collection = database.collection('heartCounts');
        const counts = await collection.find({}).toArray();
        const result = {};
        counts.forEach(item => {
            result[item.productId] = item.count;
        });
        return result;
    } catch (error) {
        console.error('获取爱心数量时出错:', error);
        return {};
    }
}

// 更新产品的爱心数量
async function updateHeartCount(productId, increment) {
    const database = await connectDB();
    if (!database) {
        return null;
    }

    try {
        const collection = database.collection('heartCounts');
        
        // 使用 upsert 操作，如果不存在则创建，存在则更新
        const result = await collection.findOneAndUpdate(
            { productId: productId },
            { 
                $inc: { count: increment },
                $setOnInsert: { 
                    productId: productId,
                    count: 2000 + increment, // 如果不存在，初始值为2000 + increment
                    updatedAt: new Date()
                },
                $set: { updatedAt: new Date() }
            },
            { 
                upsert: true,
                returnDocument: 'after'
            }
        );
        
        return result.value ? result.value.count : null;
    } catch (error) {
        console.error('更新爱心数量时出错:', error);
        throw error;
    }
}

// 初始化所有产品的爱心数量（如果不存在）
async function initHeartCounts(productIds) {
    const database = await connectDB();
    if (!database) {
        return;
    }

    try {
        const collection = database.collection('heartCounts');
        
        for (const productId of productIds) {
            await collection.updateOne(
                { productId: productId },
                { 
                    $setOnInsert: { 
                        productId: productId,
                        count: 2000,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                },
                { upsert: true }
            );
        }
    } catch (error) {
        console.error('初始化爱心数量时出错:', error);
    }
}

module.exports = {
    connectDB,
    disconnectDB,
    saveSubmission,
    getAllSubmissions,
    getProductSubmissions,
    getStatistics,
    getHeartCounts,
    updateHeartCount,
    initHeartCounts
};

