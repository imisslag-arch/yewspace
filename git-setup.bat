@echo off
echo 🚀 设置 GitHub 仓库...

echo.
echo 1. 初始化 Git 仓库...
git init

echo.
echo 2. 添加所有文件...
git add .

echo.
echo 3. 创建初始提交...
git commit -m "Initial commit: Camera Rental Management System with special date calculation"

echo.
echo 4. 设置主分支...
git branch -M main

echo.
echo 5. 添加远程仓库...
echo 请将下面的 YOUR_USERNAME 替换为您的 GitHub 用户名
echo git remote add origin https://github.com/YOUR_USERNAME/camera-rental-mvp.git

echo.
echo 6. 推送到 GitHub...
echo git push -u origin main

echo.
echo ✅ 设置完成！
echo.
echo 📝 接下来的步骤：
echo 1. 将 YOUR_USERNAME 替换为您的 GitHub 用户名
echo 2. 运行上面的 git remote add 命令
echo 3. 运行 git push 命令
echo.
pause