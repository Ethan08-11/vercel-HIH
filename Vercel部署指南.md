# Vercel 部署指南

## 环境变量配置

在 Vercel 部署时，需要设置以下环境变量：

### 必需的环境变量

**无需设置环境变量** - 当前项目已配置为自动适应 Vercel 环境。

### 可选的环境变量

如果需要自定义配置，可以设置：

| 变量名 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| `PORT` | 服务器端口（Vercel 自动分配，通常不需要设置） | `3000` | `3000` |
| `NODE_ENV` | 运行环境 | `production` | `production` |

## 部署步骤

### 方法1：使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   
   首次部署会询问一些问题：
   - Set up and deploy? **Yes**
   - Which scope? 选择你的账号
   - Link to existing project? **No**（首次部署）
   - Project name? 输入项目名称，如 `questionnaire`
   - Directory? 直接回车（当前目录）
   - Override settings? **No**

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

### 方法2：通过 Vercel 网站

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的 Git 仓库
   - 或直接上传项目文件夹

3. **配置项目**
   - Framework Preset: **Other**
   - Root Directory: `./`（默认）
   - Build Command: 留空（无需构建）
   - Output Directory: 留空
   - Install Command: `npm install`

4. **环境变量**（可选）
   - 在 "Environment Variables" 部分
   - 当前项目无需设置环境变量
   - 如果需要，可以添加 `NODE_ENV=production`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

## 部署后的访问

部署成功后，Vercel 会提供一个 URL，例如：
- `https://your-project-name.vercel.app`

### API 端点

- 前端页面: `https://your-project-name.vercel.app/`
- 提交API: `https://your-project-name.vercel.app/api/submit`
- 统计API: `https://your-project-name.vercel.app/api/statistics`

## 重要说明

### 数据存储限制

⚠️ **Vercel 是无服务器平台，文件系统是只读的**

当前代码使用文件系统存储数据，在 Vercel 上**无法正常工作**，因为：
- Vercel 的文件系统是只读的
- 每次请求可能在不同的服务器上
- 无法持久化保存数据

### 解决方案

#### 方案1：使用 Vercel KV（推荐）

1. **安装依赖**
   ```bash
   npm install @vercel/kv
   ```

2. **在 Vercel 中启用 KV**
   - 项目设置 > Storage > Create Database
   - 选择 KV
   - 创建数据库

3. **设置环境变量**
   - `KV_REST_API_URL` - Vercel 自动提供
   - `KV_REST_API_TOKEN` - Vercel 自动提供

#### 方案2：使用外部数据库

- MongoDB Atlas（免费）
- Supabase（免费）
- PlanetScale（免费）

#### 方案3：仅前端部署

如果只需要展示问卷，不需要保存数据：
- 只部署前端文件（HTML/CSS/JS）
- 移除后端 API 调用
- 数据仅在前端显示，不保存

## 当前配置说明

项目已配置：
- ✅ `vercel.json` - Vercel 配置文件
- ✅ 动态 API 地址 - 自动适应部署环境
- ✅ 端口自动配置 - 使用 Vercel 分配的端口

## 测试部署

部署后测试：
1. 访问部署的 URL
2. 测试图片轮播
3. 测试产品选择
4. 测试提交功能（如果配置了数据存储）

## 常见问题

### Q: 部署后无法保存数据
**A:** Vercel 文件系统只读，需要使用数据库服务（见上方解决方案）

### Q: API 请求失败
**A:** 检查：
- API 路由是否正确配置
- CORS 设置是否正确
- 环境变量是否设置

### Q: 图片无法显示
**A:** 确保图片文件已上传，路径使用相对路径

