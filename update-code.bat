@echo off
echo 🔄 更新代码到 GitHub...

echo.
echo 1. 添加所有更改的文件...
git add .

echo.
echo 2. 提交更改...
set /p commit_message="请输入提交信息 (例如: 修复日期计算bug): "
git commit -m "%commit_message%"

echo.
echo 3. 推送到 GitHub...
git push origin main

echo.
echo ✅ 代码已更新到 GitHub！
echo 🌐 Netlify 将自动重新部署您的网站
echo.
pause