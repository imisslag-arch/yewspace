@echo off
echo ========================================
echo    相机租赁系统 - 前端服务器启动
echo ========================================
echo.

echo 检查 Node.js 是否安装...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
echo.

echo 检查依赖包...
if not exist "node_modules" (
    echo 📦 正在安装依赖包...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖包安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖包安装完成
) else (
    echo ✅ 依赖包已存在
)

echo.
echo 🚀 启动服务器...
echo 服务器将在 http://localhost:3000 运行
echo 按 Ctrl+C 停止服务器
echo.

node simple-server.js

pause
