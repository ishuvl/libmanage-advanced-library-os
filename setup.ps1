# 📦 快速开始脚本

Write-Host "🚀 开始安装图书管理系统..." -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js 是否安装
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 未检测到 Node.js，请先安装 Node.js (https://nodejs.org/)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js 版本: $(node -v)" -ForegroundColor Green
Write-Host "✅ npm 版本: $(npm -v)" -ForegroundColor Green
Write-Host ""

# 安装依赖
Write-Host "📦 正在安装项目依赖..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ 依赖安装成功！" -ForegroundColor Green
Write-Host ""

# 检查 .env 文件
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  未检测到 .env 文件" -ForegroundColor Yellow
    Write-Host "📝 正在创建 .env 文件..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "⚠️  请编辑 .env 文件，填入你的 Supabase 配置:" -ForegroundColor Yellow
    Write-Host "   1. VITE_SUPABASE_URL" -ForegroundColor White
    Write-Host "   2. VITE_SUPABASE_ANON_KEY" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 配置说明请查看 SUPABASE_GUIDE.md" -ForegroundColor Cyan
    Write-Host ""
    
    $response = Read-Host "是否现在打开 .env 文件进行编辑? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        notepad .env
    }
} else {
    Write-Host "✅ .env 文件已存在" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 安装完成！" -ForegroundColor Green
Write-Host ""
Write-Host "📋 接下来的步骤：" -ForegroundColor Cyan
Write-Host "   1. 在 Supabase 创建项目并执行 supabase/schema.sql" -ForegroundColor White
Write-Host "   2. 配置 .env 文件中的 Supabase 凭证" -ForegroundColor White
Write-Host "   3. 运行 'npm run dev' 启动项目" -ForegroundColor White
Write-Host ""
Write-Host "📖 详细说明请查看 SUPABASE_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
