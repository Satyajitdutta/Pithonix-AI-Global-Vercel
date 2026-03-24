# PITHONIX Sync Script
# Runs a loop to detect changes and sync to GitHub & Vercel
# Usage: .\sync.ps1

Write-Host "PITHONIX AI Sync Engine Active..." -ForegroundColor Cyan

while($true) {
    if (git status --porcelain) {
        Write-Host "Change detected. Synchronizing..." -ForegroundColor Yellow
        git add .
        git commit -m "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git push origin main
        Write-Host "Production Synced Successfully." -ForegroundColor Green
    }
    Start-Sleep -Seconds 10
}
