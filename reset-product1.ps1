# PowerShell脚本：重置服务器爱心数量为2000
param(
    [switch]$All  # 如果指定 -All，则重置所有产品
)

$headers = @{
    "Content-Type" = "application/json"
}

if ($All) {
    # 重置所有产品
    $uri = "https://questionnaire-app.zeabur.app/api/reset-all-heart-counts"
    
    Write-Host "⚠️  警告：这将重置所有产品（1-63）的服务器爱心数量为2000！" -ForegroundColor Yellow
    $confirm = Read-Host "确定要继续吗？(y/N)"
    
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "操作已取消" -ForegroundColor Yellow
        exit
    }
    
    try {
        Write-Host "🔄 正在重置所有产品的服务器爱心数量为2000..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers
        
        if ($response.success) {
            Write-Host "✅ 重置成功！" -ForegroundColor Green
            Write-Host "   消息: $($response.message)" -ForegroundColor Green
            Write-Host "   总计: $($response.total) 个产品" -ForegroundColor Green
            Write-Host "   成功: $($response.successCount) 个" -ForegroundColor Green
            Write-Host "   失败: $($response.failCount) 个" -ForegroundColor $(if ($response.failCount -eq 0) { "Green" } else { "Red" })
        } else {
            Write-Host "❌ 重置失败: $($response.message)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ 请求失败: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "   详细信息: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
} else {
    # 重置产品1
    $uri = "https://questionnaire-app.zeabur.app/api/reset-heart-count"
    $body = @{
        productId = 1
    } | ConvertTo-Json

    try {
        Write-Host "🔄 正在重置产品1的服务器爱心数量为2000..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
        
        if ($response.success) {
            Write-Host "✅ 重置成功！" -ForegroundColor Green
            Write-Host "   产品ID: $($response.productId)" -ForegroundColor Green
            Write-Host "   服务器爱心数量: $($response.count)" -ForegroundColor Green
            Write-Host "   消息: $($response.message)" -ForegroundColor Green
        } else {
            Write-Host "❌ 重置失败: $($response.message)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ 请求失败: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "   详细信息: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
}
