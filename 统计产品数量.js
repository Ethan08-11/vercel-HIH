const fs = require('fs');
const path = require('path');

// 统计产品数量
function countProducts() {
    const dataDir = path.join(__dirname, 'data');
    
    if (!fs.existsSync(dataDir)) {
        console.log('数据目录不存在！');
        return;
    }

    const files = fs.readdirSync(dataDir);
    const statistics = {};
    
    // 统计主目录中的文件
    files
        .filter(file => file.endsWith('.json') && !file.startsWith('statistics'))
        .forEach(file => {
            // 解析文件名：格式为 [产品ID]_[产品名称]_[提交ID].json
            const match = file.match(/^(\d+)_(.+?)_(\d+)\.json$/);
            if (match) {
                const productId = match[1];
                const productName = match[2];
                
                if (!statistics[productId]) {
                    statistics[productId] = {
                        productId: productId,
                        productName: productName,
                        count: 0,
                        files: []
                    };
                }
                
                statistics[productId].count++;
                statistics[productId].files.push(file);
            }
        });

    // 转换为数组并按产品ID排序
    const statisticsArray = Object.values(statistics)
        .sort((a, b) => parseInt(a.productId) - parseInt(b.productId));

    // 显示统计结果
    console.log('\n========== 产品统计结果 ==========\n');
    console.log('产品ID | 产品名称      | 选择次数');
    console.log('-----------------------------------');
    
    let totalCount = 0;
    statisticsArray.forEach(item => {
        const id = item.productId.padEnd(6);
        const name = item.productName.padEnd(12);
        const count = item.count.toString().padEnd(8);
        console.log(`${id} | ${name} | ${count}`);
        totalCount += item.count;
    });
    
    console.log('-----------------------------------');
    console.log(`总计: ${statisticsArray.length} 个产品，共 ${totalCount} 次选择\n`);
    
    // 按选择次数排序显示
    console.log('========== 按受欢迎程度排序 ==========\n');
    const sortedByCount = [...statisticsArray].sort((a, b) => b.count - a.count);
    sortedByCount.forEach((item, index) => {
        console.log(`${index + 1}. ${item.productName} (ID: ${item.productId}) - ${item.count} 次`);
    });
    
    console.log('\n');
    
    // 保存统计结果到文件
    const statisticsFile = path.join(dataDir, 'statistics.json');
    const statisticsData = {
        generatedAt: new Date().toLocaleString('zh-CN'),
        totalProducts: statisticsArray.length,
        totalSubmissions: totalCount,
        statistics: statisticsArray.map(item => ({
            productId: item.productId,
            productName: item.productName,
            count: item.count
        }))
    };
    
    fs.writeFileSync(statisticsFile, JSON.stringify(statisticsData, null, 2), 'utf8');
    console.log(`统计结果已保存到: ${statisticsFile}\n`);
    
    return statisticsArray;
}

// 运行统计
countProducts();

