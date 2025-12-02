/**
 * 图片转换为 WebP 格式脚本
 * 将 Picture 文件夹中的 JPG 图片转换为 WebP 格式
 * 
 * 使用方法：
 * npm install sharp
 * node convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp
let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.error('❌ 错误: 未安装 sharp 库');
    console.log('\n请先安装 sharp:');
    console.log('  npm install sharp');
    console.log('\n或者使用 npm 安装:');
    console.log('  npm install');
    process.exit(1);
}

const PICTURE_DIR = path.join(__dirname, 'Picture');
const QUALITY = 85; // WebP 质量 (1-100)
const EFFORT = 4; // 压缩努力程度 (0-6, 越高压缩越好但越慢)

async function convertToWebP() {
    console.log('🔄 开始转换图片为 WebP 格式...\n');
    
    // 检查 Picture 目录是否存在
    if (!fs.existsSync(PICTURE_DIR)) {
        console.error(`❌ 错误: 找不到 Picture 目录: ${PICTURE_DIR}`);
        process.exit(1);
    }
    
    // 读取所有 JPG 文件
    const files = fs.readdirSync(PICTURE_DIR)
        .filter(file => /\.(jpg|jpeg)$/i.test(file))
        .sort((a, b) => {
            // 按数字排序
            const numA = parseInt(a.match(/\d+/)?.[0] || '0');
            const numB = parseInt(b.match(/\d+/)?.[0] || '0');
            return numA - numB;
        });
    
    if (files.length === 0) {
        console.log('⚠️  未找到 JPG 图片文件');
        return;
    }
    
    console.log(`📁 找到 ${files.length} 个图片文件\n`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    const results = [];
    
    // 转换每个文件
    for (const file of files) {
        const inputPath = path.join(PICTURE_DIR, file);
        const baseName = path.parse(file).name;
        const outputPath = path.join(PICTURE_DIR, `${baseName}.webp`);
        
        // 检查 WebP 文件是否已存在
        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  跳过: ${file} (WebP 已存在)`);
            skipCount++;
            results.push({
                original: file,
                webp: `${baseName}.webp`,
                status: 'skipped'
            });
            continue;
        }
        
        try {
            console.log(`🔄 转换: ${file} → ${baseName}.webp`);
            
            // 获取原始文件大小
            const originalStats = fs.statSync(inputPath);
            const originalSize = originalStats.size;
            
            // 转换为 WebP
            await sharp(inputPath)
                .webp({ 
                    quality: QUALITY,
                    effort: EFFORT
                })
                .toFile(outputPath);
            
            // 获取转换后文件大小
            const webpStats = fs.statSync(outputPath);
            const webpSize = webpStats.size;
            const saved = originalSize - webpSize;
            const savedPercent = ((saved / originalSize) * 100).toFixed(1);
            
            console.log(`  ✅ 完成: ${formatSize(originalSize)} → ${formatSize(webpSize)} (节省 ${savedPercent}%)`);
            
            successCount++;
            results.push({
                original: file,
                webp: `${baseName}.webp`,
                originalSize: originalSize,
                webpSize: webpSize,
                saved: saved,
                savedPercent: savedPercent,
                status: 'success'
            });
            
        } catch (error) {
            console.error(`  ❌ 失败: ${error.message}`);
            errorCount++;
            results.push({
                original: file,
                status: 'error',
                error: error.message
            });
        }
    }
    
    // 显示总结
    console.log('\n' + '='.repeat(50));
    console.log('📊 转换完成！');
    console.log('='.repeat(50));
    console.log(`✅ 成功: ${successCount} 个`);
    console.log(`⏭️  跳过: ${skipCount} 个`);
    console.log(`❌ 失败: ${errorCount} 个`);
    
    if (successCount > 0) {
        const totalOriginal = results
            .filter(r => r.status === 'success')
            .reduce((sum, r) => sum + (r.originalSize || 0), 0);
        const totalWebp = results
            .filter(r => r.status === 'success')
            .reduce((sum, r) => sum + (r.webpSize || 0), 0);
        const totalSaved = totalOriginal - totalWebp;
        const totalSavedPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);
        
        console.log(`\n💾 总大小:`);
        console.log(`   原始: ${formatSize(totalOriginal)}`);
        console.log(`   WebP: ${formatSize(totalWebp)}`);
        console.log(`   节省: ${formatSize(totalSaved)} (${totalSavedPercent}%)`);
    }
    
    console.log('\n💡 提示:');
    console.log('  1. WebP 文件已保存在 Picture 文件夹中');
    console.log('  2. 运行 npm run update-images 更新代码以使用 WebP 格式');
    console.log('  3. 或者手动更新 script.js 中的图片路径');
}

// 格式化文件大小
function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// 运行转换
convertToWebP().catch(error => {
    console.error('\n❌ 转换过程中出错:', error);
    process.exit(1);
});

