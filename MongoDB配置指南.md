# MongoDB 数据库配置指南

本指南将帮助您设置 MongoDB Atlas 数据库，以便在 Vercel 上保存调查问卷数据。

## 📋 目录

1. [创建 MongoDB Atlas 账户](#创建-mongodb-atlas-账户)
2. [创建数据库集群](#创建数据库集群)
3. [获取连接字符串](#获取连接字符串)
4. [配置 Vercel 环境变量](#配置-vercel-环境变量)
5. [本地开发配置](#本地开发配置)
6. [验证配置](#验证配置)

---

## 1. 创建 MongoDB Atlas 账户

1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. 点击 **"Try Free"** 或 **"Sign Up"**
3. 使用您的邮箱注册账户（可以使用 GitHub 账户快速注册）
4. 完成邮箱验证

---

## 2. 创建数据库集群

### 导航到数据库创建页面

如果您当前在组织设置页面（如 Federation、Billing 等），需要先进入项目：

1. **方法 1：从顶部导航栏**
   - 点击页面顶部的 **"Projects"** 或 **"All Projects"**
   - 如果还没有项目，点击 **"New Project"** 创建一个新项目
   - 如果已有项目，选择或创建一个项目

2. **方法 2：从左侧导航栏**
   - 在左侧导航栏中找到 **"All Projects"**（在 IDENTITY & ACCESS 下）
   - 点击进入项目列表
   - 选择现有项目或点击 **"New Project"** 创建新项目

3. **进入项目后**
   - 在项目页面，您会看到 **"Deploy a cloud database"** 或 **"Build a Database"** 按钮
   - 点击该按钮开始创建数据库

### 步骤 1: 选择部署类型
1. 点击 **"Build a Database"** 或 **"Deploy a cloud database"**
2. 选择 **FREE (M0)** 免费套餐（适合开发和小型项目）
   - 如果看到多个选项，选择 **"M0 Sandbox"** 或 **"FREE"**
3. 选择云服务提供商和区域（建议选择离您最近的区域，如 `Asia Pacific (ap-southeast-1)`）

### 步骤 2: 配置集群
1. 集群名称可以保持默认（如 `Cluster0`）或自定义（如 `questionnaire-cluster`）
2. 点击 **"Create"** 或 **"Create Cluster"** 创建集群
3. 等待 1-3 分钟，集群创建完成
   - 您会看到 "Your cluster is being created" 的提示

---

## 3. 获取连接字符串

### 步骤 1: 创建数据库用户
1. 在集群创建完成后，会弹出 **"Create Database User"** 对话框
2. 设置用户名和密码（**请务必保存密码！**）
   - 用户名：例如 `questionnaire-user`
   - 密码：使用强密码（建议使用密码生成器）
3. 点击 **"Create Database User"**

### 步骤 2: 配置网络访问
1. 在 **"Network Access"** 部分，点击 **"Add IP Address"**
2. 选择 **"Allow Access from Anywhere"**（输入 `0.0.0.0/0`）
   - ⚠️ **注意**：对于生产环境，建议只添加特定 IP
   - 对于开发，允许所有 IP 更方便
3. 点击 **"Confirm"**

### 步骤 3: 获取连接字符串
1. 点击 **"Connect"** 按钮
2. 选择 **"Connect your application"**
3. 选择驱动版本：**Node.js** 和版本（如 `6.0 or later`）
4. 复制连接字符串，格式如下：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. 将 `<username>` 和 `<password>` 替换为您创建的用户名和密码

---

## 4. 配置 Vercel 环境变量

### 在 Vercel 控制台设置：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `MONGODB_URI` | `mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority` | MongoDB 连接字符串 |
| `DB_NAME` | `questionnaire` | 数据库名称（可选，默认为 `questionnaire`） |

5. 确保选择所有环境（Production, Preview, Development）
6. 点击 **"Save"**

### 重新部署

设置环境变量后，需要重新部署项目：
1. 在 Vercel Dashboard 中，进入 **Deployments**
2. 找到最新的部署，点击 **"..."** → **"Redeploy"**
3. 或者推送新的代码到 GitHub，Vercel 会自动重新部署

---

## 5. 本地开发配置

### 方法 1: 使用 `.env` 文件（推荐）

1. 在项目根目录创建 `.env` 文件：
   ```bash
   MONGODB_URI=mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=questionnaire
   ```

2. 安装 `dotenv` 包（如果还没有）：
   ```bash
   npm install dotenv
   ```

3. 在 `server.js` 文件开头添加：
   ```javascript
   require('dotenv').config();
   ```

### 方法 2: 直接设置环境变量

**Windows (CMD):**
```cmd
set MONGODB_URI=mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
set DB_NAME=questionnaire
```

**Windows (PowerShell):**
```powershell
$env:MONGODB_URI="mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
$env:DB_NAME="questionnaire"
```

**macOS/Linux:**
```bash
export MONGODB_URI="mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
export DB_NAME="questionnaire"
```

---

## 6. 验证配置

### 测试数据库连接

1. 启动服务器：
   ```bash
   npm start
   ```

2. 查看控制台输出：
   - ✅ 如果看到 `✅ MongoDB 连接成功`，说明配置正确
   - ❌ 如果看到 `❌ MongoDB 连接失败`，请检查：
     - 连接字符串是否正确
     - 用户名和密码是否正确
     - 网络访问是否已配置
     - IP 地址是否在白名单中

### 测试数据提交

1. 访问您的应用
2. 选择一些产品并提交
3. 在 MongoDB Atlas 中查看数据：
   - 登录 MongoDB Atlas
   - 点击 **"Browse Collections"**
   - 应该能看到 `questionnaire` 数据库和 `submissions` 集合
   - 点击集合可以看到提交的数据

---

## 🔒 安全提示

1. **不要将 `.env` 文件提交到 Git**
   - 确保 `.env` 在 `.gitignore` 中

2. **使用强密码**
   - 数据库用户密码应该足够复杂

3. **限制网络访问**
   - 生产环境建议只允许特定 IP 访问

4. **定期更新密码**
   - 定期更换数据库用户密码

---

## 📊 数据库结构

数据会存储在以下结构中：

**数据库名：** `questionnaire`（可在环境变量中配置）

**集合名：** `submissions`

**文档结构：**
```json
{
  "_id": "ObjectId",
  "submissionId": 1234567890,
  "productId": 1,
  "productName": "玩偶",
  "productImage": "Picture/1.jpg",
  "answers": {},
  "selectedProducts": [...],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "submittedAt": "2024/1/1 00:00:00",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## ❓ 常见问题

### Q: 连接失败，提示 "authentication failed"
**A:** 检查用户名和密码是否正确，确保在连接字符串中正确替换了 `<username>` 和 `<password>`

### Q: 连接失败，提示 "IP not whitelisted"
**A:** 在 MongoDB Atlas 的 Network Access 中添加您的 IP 地址，或使用 `0.0.0.0/0` 允许所有 IP（仅开发环境）

### Q: Vercel 部署后仍然无法保存数据
**A:** 
1. 确保环境变量已正确设置
2. 重新部署项目
3. 检查 Vercel 的部署日志，查看是否有数据库连接错误

### Q: 本地开发时连接失败
**A:** 
1. 确保 `.env` 文件存在且格式正确
2. 确保已安装 `dotenv` 包
3. 检查连接字符串是否正确

---

## 📚 相关资源

- [MongoDB Atlas 官方文档](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js 驱动文档](https://docs.mongodb.com/drivers/node/)
- [Vercel 环境变量文档](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ 完成检查清单

- [ ] 创建 MongoDB Atlas 账户
- [ ] 创建数据库集群
- [ ] 创建数据库用户
- [ ] 配置网络访问
- [ ] 获取连接字符串
- [ ] 在 Vercel 设置环境变量
- [ ] 重新部署项目
- [ ] 验证数据库连接
- [ ] 测试数据提交功能

完成以上步骤后，您的调查问卷应用就可以在 Vercel 上正常保存数据了！🎉

