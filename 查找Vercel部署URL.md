# 如何找到 Vercel 部署的应用 URL

## 方法 1：从 Vercel Dashboard 查找

### 步骤：

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com/dashboard
   - 使用您的账户登录

2. **找到您的项目**
   - 在 Dashboard 主页，您会看到所有项目的列表
   - 找到项目名称（如 `questionnaire-hih` 或 `vercel-hih`）
   - 点击项目名称进入项目详情

3. **查看部署列表**
   - 在项目页面，点击顶部的 **"Deployments"** 标签
   - 您会看到所有部署记录的列表

4. **找到最新部署**
   - 找到状态为 **"Ready"** 或 **"成功"** 的最新部署
   - 部署卡片上通常会显示：
     - 部署时间
     - 状态（绿色勾号表示成功）
     - 一个链接或按钮

5. **获取访问 URL**
   - 在部署卡片上，您会看到：
     - **"Visit"** 按钮（点击直接访问）
     - 或一个 URL 链接（格式类似：`https://xxx.vercel.app`）
   - 点击 **"Visit"** 或复制 URL

## 方法 2：从项目概览页面查找

1. **进入项目概览**
   - 在项目页面，默认显示的是 **"Overview"** 标签

2. **查找域名信息**
   - 在页面右侧或下方，找到 **"Domains"** 或 **"Production Deployment"** 部分
   - 您会看到生产环境的 URL

3. **常见位置**
   - 页面顶部：项目名称旁边可能有 URL
   - 右侧边栏：可能有 "Visit" 按钮
   - 部署卡片：在概览页面的部署历史中

## 方法 3：从浏览器地址栏

如果您之前访问过应用，可以：
1. 查看浏览器历史记录
2. 或在 Vercel Dashboard 的地址栏中，URL 格式通常是：
   ```
   https://vercel.com/[团队名]/[项目名]
   ```
   应用 URL 通常是：
   ```
   https://[项目名].vercel.app
   ```

## 方法 4：检查项目设置

1. **进入项目设置**
   - 在项目页面，点击 **"Settings"** 标签

2. **查看域名**
   - 在 **"Domains"** 部分，可以看到所有配置的域名
   - 生产环境的 URL 会显示在这里

## 如果仍然找不到

### 检查部署状态：

1. **查看部署日志**
   - 进入 **"Deployments"** 标签
   - 点击最新的部署
   - 查看 **"Build Logs"** 或 **"Function Logs"**
   - 检查是否有错误信息

2. **重新部署**
   - 如果部署失败，点击 **"Redeploy"** 重新部署
   - 等待部署完成后，再次查找 URL

3. **检查项目配置**
   - 确保项目已正确连接到 Git 仓库
   - 确保 `vercel.json` 配置正确

## 常见问题

### Q: 部署状态显示 "Building" 或 "Error"
**A:** 等待部署完成，或查看错误日志修复问题后重新部署

### Q: 找不到 "Visit" 按钮
**A:** 
- 检查部署是否成功（状态应为 "Ready"）
- 尝试刷新页面
- 查看部署详情页面

### Q: URL 显示 404 错误
**A:** 
- 检查 `vercel.json` 配置
- 确保 `server.js` 正确导出
- 查看部署日志中的错误信息

## 快速测试

如果您知道项目名称，可以直接尝试访问：
```
https://[您的项目名称].vercel.app
```

例如：
- `https://questionnaire-hih.vercel.app`
- `https://vercel-hih.vercel.app`
- `https://hih-questionnaire.vercel.app`

如果项目名称不确定，可以在 Vercel Dashboard 的项目设置中查看。

