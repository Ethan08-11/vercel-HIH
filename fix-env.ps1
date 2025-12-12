# 修复 .env 文件中的 MongoDB 连接字符串错误
# 自动将 sjcl 改为 sjc1（修复主机名拼写错误）

Write-Host "🔧 正在检查并修复 .env 文件..." -ForegroundColor Cyan

$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ 错误: 找不到 .env 文件" -ForegroundColor Red
    Write-Host "   请确保 .env 文件位于项目根目录: $envFile" -ForegroundColor Yellow
    exit 1
}

$content = Get-Content $envFile -Raw

# 检查是否包含错误的主机名
if ($content -match "sjcl\.clusters\.zeabur\.com") {
    Write-Host "⚠️  检测到主机名拼写错误: sjcl.clusters.zeabur.com" -ForegroundColor Yellow
    Write-Host "   正在修复为: sjc1.clusters.zeabur.com..." -ForegroundColor Cyan
    
    # 修复主机名
    $content = $content -replace "sjcl\.clusters\.zeabur\.com", "sjc1.clusters.zeabur.com"
    
    # 保存修复后的内容
    Set-Content -Path $envFile -Value $content -NoNewline
    
    Write-Host "✅ 修复完成！" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 修复内容:" -ForegroundColor Cyan
    Write-Host "   sjcl.clusters.zeabur.com → sjc1.clusters.zeabur.com" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 提示: 请重新运行同步命令: npm run sync" -ForegroundColor Yellow
} elseif ($content -match "sjc1\.clusters\.zeabur\.com") {
    Write-Host "✅ 主机名配置正确: sjc1.clusters.zeabur.com" -ForegroundColor Green
} else {
    Write-Host "⚠️  未检测到标准的主机名格式" -ForegroundColor Yellow
    Write-Host "   请手动检查 .env 文件中的 MONGODB_URI 配置" -ForegroundColor Yellow
}

# 检查端口号
if ($content -match ":23654") {
    Write-Host "⚠️  检测到旧端口号: 23654" -ForegroundColor Yellow
    Write-Host "   建议更新为: 28174" -ForegroundColor Yellow
    Write-Host ""
    $fixPort = Read-Host "是否自动修复端口号? (Y/N)"
    if ($fixPort -eq "Y" -or $fixPort -eq "y") {
        $content = $content -replace ":23654", ":28174"
        Set-Content -Path $envFile -Value $content -NoNewline
        Write-Host "✅ 端口号已修复为 28174" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📋 当前配置摘要:" -ForegroundColor Cyan
$lines = Get-Content $envFile
foreach ($line in $lines) {
    if ($line -match "^MONGODB_URI=") {
        # 隐藏密码显示
        $displayLine = $line -replace ":[^:@]+@", ":****@"
        Write-Host "   $displayLine" -ForegroundColor White
    }
}
