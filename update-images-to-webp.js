/**
 * 更新代码以使用 WebP 格式
 * 自动更新 script.js 中的图片路径
 */

const fs = require('fs');
const path = require('path');

const SCRIPT_FILE = path.join(__dirname, 'script.js');
const PICTURE_DIR = path.join(__dirname, 'Picture');

function updateImagesToWebP() {
    console.log('🔄 更新代码以使用 WebP 格式...\n');
    
    // 检查 script.js 是否存在
    if (!fs.existsSync(SCRIPT_FILE)) {
        console.error(`❌ 错误: 找不到 script.js 文件`);
        process.exit(1);
    }
    
    // 读取 script.js
    let content = fs.readFileSync(SCRIPT_FILE, 'utf8');
    
    // 检查 Picture 目录中的 WebP 文件
    if (!fs.existsSync(PICTURE_DIR)) {
        console.error(`❌ 错误: 找不到 Picture 目录`);
        process.exit(1);
    }
    
    const webpFiles = fs.readdirSync(PICTURE_DIR)
        .filter(file => file.endsWith('.webp'))
        .map(file => path.parse(file).name);
    
    if (webpFiles.length === 0) {
        console.log('⚠️  未找到 WebP 文件');
        console.log('请先运行: node convert-to-webp.js');
        process.exit(1);
    }
    
    console.log(`📁 找到 ${webpFiles.length} 个 WebP 文件\n`);
    
    // 替换图片路径
    let updatedCount = 0;
    
    // 匹配 productImages 数组中的图片路径
    const imagePattern = /image:\s*['"`]\/Picture\/(\d+)\.jpg['"`]/g;
    
    content = content.replace(imagePattern, (match, number) => {
        const webpFile = `${number}.webp`;
        if (webpFiles.includes(number)) {
            console.log(`  ✅ 更新: ${number}.jpg → ${webpFile}`);
            updatedCount++;
            return match.replace('.jpg', '.webp');
        } else {
            console.log(`  ⚠️  跳过: ${number}.jpg (未找到对应的 WebP 文件)`);
            return match;
        }
    });
    
    // 检查是否有更新
    if (updatedCount === 0) {
        console.log('\n⚠️  未找到需要更新的图片路径');
        console.log('请检查 script.js 中的图片路径格式');
        return;
    }
    
    // 备份原文件
    const backupFile = SCRIPT_FILE + '.backup';
    fs.copyFileSync(SCRIPT_FILE, backupFile);
    console.log(`\n💾 已创建备份: ${backupFile}`);
    
    // 写入更新后的内容
    fs.writeFileSync(SCRIPT_FILE, content, 'utf8');
    
    console.log(`\n✅ 更新完成！`);
    console.log(`   更新了 ${updatedCount} 个图片路径`);
    console.log(`   备份文件: ${backupFile}`);
    console.log(`\n💡 提示: 如果出现问题，可以从备份文件恢复`);
}

updateImagesToWebP();

