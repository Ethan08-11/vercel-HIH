Write-Host "=== 检查Git推送状态 ===" -ForegroundColor Cyan
cd "c:\Users\30543\Desktop\Questionnaire"

Write-Host "`n1. 检查工作区状态:" -ForegroundColor Yellow
git status

Write-Host "`n2. 本地最新提交:" -ForegroundColor Yellow
git log --oneline -1

Write-Host "`n3. 远程最新提交:" -ForegroundColor Yellow
git fetch origin
git log origin/main --oneline -1

Write-Host "`n4. 未推送的提交:" -ForegroundColor Yellow
$unpushed = git log origin/main..HEAD --oneline
if ($unpushed) {
    Write-Host "发现未推送的提交:" -ForegroundColor Red
    git log origin/main..HEAD --oneline
    Write-Host "`n正在推送到GitHub..." -ForegroundColor Cyan
    git push origin main
} else {
    Write-Host "✓ 所有提交已推送" -ForegroundColor Green
}

Write-Host "`n5. 检查本地文件修改:" -ForegroundColor Yellow
$modified = git diff --name-only
if ($modified) {
    Write-Host "发现未提交的修改:" -ForegroundColor Yellow
    git diff --name-only
} else {
    Write-Host "✓ 没有未提交的修改" -ForegroundColor Green
}

Write-Host "`n完成!" -ForegroundColor Green
