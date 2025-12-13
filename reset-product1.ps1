# PowerShell script: Reset server heart counts to 2000
# Usage: .\reset-product1.ps1          - Reset product 1 only
#        .\reset-product1.ps1 -All    - Reset all products (1-63)
param(
    [switch]$All
)

$headers = @{
    "Content-Type" = "application/json"
}

if ($All) {
    # Reset all products
    $uri = "https://questionnaire-app.zeabur.app/api/reset-all-heart-counts"
    
    Write-Host "WARNING: This will reset all products (1-63) server heart counts to 2000!" -ForegroundColor Yellow
    $confirm = Read-Host "Are you sure you want to continue? (y/N)"
    
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Operation cancelled" -ForegroundColor Yellow
        exit
    }
    
    try {
        Write-Host "Resetting all products server heart counts to 2000..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers
        
        if ($response.success) {
            Write-Host "SUCCESS! Reset completed!" -ForegroundColor Green
            Write-Host "   Message: $($response.message)" -ForegroundColor Green
            Write-Host "   Total: $($response.total) products" -ForegroundColor Green
            Write-Host "   Success: $($response.successCount) products" -ForegroundColor Green
            $failColor = if ($response.failCount -eq 0) { "Green" } else { "Red" }
            Write-Host "   Failed: $($response.failCount) products" -ForegroundColor $failColor
        } else {
            Write-Host "FAILED: $($response.message)" -ForegroundColor Red
        }
    } catch {
        Write-Host "Request failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
} else {
    # Reset product 1 only
    $uri = "https://questionnaire-app.zeabur.app/api/reset-heart-count"
    $body = @{
        productId = 1
    } | ConvertTo-Json

    try {
        Write-Host "Resetting product 1 server heart count to 2000..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
        
        if ($response.success) {
            Write-Host "SUCCESS! Reset completed!" -ForegroundColor Green
            Write-Host "   Product ID: $($response.productId)" -ForegroundColor Green
            Write-Host "   Server heart count: $($response.count)" -ForegroundColor Green
            Write-Host "   Message: $($response.message)" -ForegroundColor Green
        } else {
            Write-Host "FAILED: $($response.message)" -ForegroundColor Red
        }
    } catch {
        Write-Host "Request failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
}
