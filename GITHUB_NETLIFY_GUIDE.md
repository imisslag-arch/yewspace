# 🚀 GitHub + Netlify 自动化部署操作指南

## 📋 前提条件
- ✅ 项目已部署到 Netlify
- ✅ 有 GitHub 账户
- ✅ 本地有 Git（如果没有，下载 [Git for Windows](https://git-scm.com/download/win)）

## 🔧 第一步：GitHub 仓库设置

### 1. 创建 GitHub 仓库
1. 访问 [github.com](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`camera-rental-mvp`
4. 选择 "Public"
5. 不要勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 获取仓库地址
创建完成后，GitHub 会显示仓库地址，类似：
```
https://github.com/您的用户名/camera-rental-mvp.git
```

## 💻 第二步：本地 Git 设置

### 方法一：使用批处理文件（推荐）

1. **运行初始设置**
   - 双击运行 `git-setup.bat`
   - 按照提示操作

2. **手动替换用户名**
   - 打开命令提示符（cmd）
   - 进入项目目录：`cd C:\Users\User\Desktop\camera-rental-mvp`
   - 运行以下命令（替换 YOUR_USERNAME）：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: Camera Rental Management System"

# 设置主分支
git branch -M main

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/camera-rental-mvp.git

# 推送到 GitHub
git push -u origin main
```

### 方法二：手动操作

1. **打开命令提示符**
   - 按 `Win + R`，输入 `cmd`，回车
   - 进入项目目录：`cd C:\Users\User\Desktop\camera-rental-mvp`

2. **执行 Git 命令**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Camera Rental Management System"
   git branch -M main
   git remote add origin https://github.com/您的用户名/camera-rental-mvp.git
   git push -u origin main
   ```

## 🔗 第三步：连接 Netlify 到 GitHub

### 1. 在 Netlify 中设置
1. 登录 [netlify.com](https://netlify.com)
2. 进入您的网站设置
3. 点击 "Site settings" → "Build & deploy"
4. 点击 "Link repository"
5. 选择 GitHub 并授权
6. 选择您的 `camera-rental-mvp` 仓库
7. 设置构建选项：
   - Build command: `echo "No build required"`
   - Publish directory: `.` 或留空
8. 点击 "Deploy site"

### 2. 验证连接
- 连接成功后，每次推送代码到 GitHub 都会自动触发 Netlify 重新部署
- 在 Netlify 控制台可以看到部署历史

## 🔄 第四步：日常更新代码流程

### 使用批处理文件（最简单）
1. 修改代码（如修改 `index.html`）
2. 双击运行 `update-code.bat`
3. 输入提交信息
4. 等待自动推送和部署

### 手动操作
1. **修改代码**
   - 编辑 `index.html` 或其他文件
   - 保存更改

2. **提交更改**
   ```bash
   git add .
   git commit -m "描述您的更改"
   git push origin main
   ```

3. **等待部署**
   - Netlify 会自动检测到 GitHub 的更改
   - 通常在 1-2 分钟内完成重新部署

## 📱 第五步：验证部署

### 1. 检查 Netlify 部署
- 登录 Netlify 控制台
- 查看 "Deploys" 页面
- 确认最新部署状态为 "Published"

### 2. 测试网站功能
- 访问您的 Netlify 域名
- 测试所有功能是否正常
- 特别测试新添加的特殊日期计算功能

## 🔧 常见问题解决

### Q: 推送失败，提示需要认证？
A: 使用 Personal Access Token：
1. GitHub → Settings → Developer settings → Personal access tokens
2. 生成新 token，选择 "repo" 权限
3. 使用 token 作为密码

### Q: Netlify 没有自动部署？
A: 检查设置：
1. 确认 GitHub 仓库连接正确
2. 检查构建设置
3. 查看 Netlify 的部署日志

### Q: 代码推送后网站没有更新？
A: 等待 1-2 分钟，或手动触发部署：
1. Netlify 控制台 → "Deploys"
2. 点击 "Trigger deploy"

## 📊 管理多个版本

### 分支管理
```bash
# 创建新功能分支
git checkout -b new-feature

# 开发完成后合并
git checkout main
git merge new-feature

# 推送更新
git push origin main
```

### 回滚版本
```bash
# 查看提交历史
git log --oneline

# 回滚到指定版本
git reset --hard 提交ID

# 强制推送
git push origin main --force
```

## 🎉 完成！

现在您已经设置了完整的自动化部署流程：

✅ **本地开发** → 修改代码  
✅ **Git 提交** → `git add . && git commit -m "描述"`  
✅ **推送到 GitHub** → `git push origin main`  
✅ **自动部署** → Netlify 自动重新部署  
✅ **网站更新** → 用户看到最新版本  

每次您修改代码后，只需要运行 `update-code.bat` 或手动执行 Git 命令，网站就会自动更新！

## 📞 需要帮助？

如果遇到问题：
1. 检查命令提示符的错误信息
2. 查看 Netlify 的部署日志
3. 确认 GitHub 仓库设置正确
4. 验证文件路径和权限
