# 后端服务器使用说明

## 重要提示

⚠️ **这是一个 Node.js 项目，不需要 JDK（Java Development Kit）**

如果 IDE 显示 "Project has no JDK configured" 错误，请忽略它，这是 IDE 的误识别。请使用命令行运行后端服务器。

## 安装依赖

首先需要安装 Node.js（建议版本 14 或更高），然后运行：

```bash
npm install
```

## 启动服务器

### 方法1：使用命令行（推荐）

打开命令行/终端，进入项目目录，运行：

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

### 方法2：在 VS Code 中运行

1. 打开 VS Code
2. 打开终端（按 `` Ctrl + ` ``）
3. 运行 `npm start`

服务器将在 `http://localhost:3000` 启动。

**看到以下信息表示成功：**
```
服务器运行在 http://localhost:3000
数据保存目录: [项目路径]/data
产品分类目录: [项目路径]/data/products
```

## API 接口

### 提交问卷数据

**POST** `/api/submit`

请求体：
```json
{
  "answers": {
    "0": true,
    "1": true,
    "2": false,
    ...
  },
  "selectedProducts": [
    {
      "id": 1,
      "name": "玩偶",
      "image": "Picture/1.jpg"
    },
    ...
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

响应：
```json
{
  "success": true,
  "message": "问卷提交成功！",
  "submissionId": 1704110400000
}
```

### 获取所有提交记录

**GET** `/api/submissions`

响应：
```json
{
  "success": true,
  "count": 10,
  "submissions": [...]
}
```

### 获取指定产品的提交记录

**GET** `/api/products/:productId`

示例：`GET /api/products/1` 获取产品ID为1的所有提交记录

响应：
```json
{
  "success": true,
  "productId": "1",
  "count": 5,
  "submissions": [...]
}
```

### 获取所有产品的统计信息

**GET** `/api/statistics`

响应：
```json
{
  "success": true,
  "totalProducts": 6,
  "statistics": [
    {
      "productId": 1,
      "productName": "玩偶",
      "count": 10,
      "submissions": [...]
    },
    ...
  ]
}
```

## MongoDB 数据库连接

### ⚠️ 重要说明

**本地开发环境**：
- Zeabur 的 MongoDB 通常只允许从 Zeabur 内部网络访问
- 本地计算机**无法直接连接**到 Zeabur 的 MongoDB（这是安全设置）
- 如果连接失败，应用会**自动降级**到本地文件系统存储，**不影响正常使用**

**Zeabur 生产环境**：
- 在 Zeabur 上部署时，应用可以正常连接到 MongoDB
- 数据会保存到 MongoDB 数据库

### 配置 MongoDB 连接

#### 1. 在 Zeabur 中配置（生产环境）

1. 进入 Zeabur 控制台
2. 选择项目 `questionnaire-app`
3. 选择服务 `questionnaire-backend`
4. 点击 "环境变量" (Environment Variables)
5. 添加环境变量：
   - **变量名**: `MONGODB_URI`
   - **变量值**: `mongodb://mongo:密码@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin`
   - **变量名**: `DB_NAME`
   - **变量值**: `questionnaire`

#### 2. 本地开发环境配置（可选）

如果你想在本地测试 MongoDB 连接（通常不会成功，但可以配置）：

1. 在项目根目录创建 `.env` 文件
2. 添加以下内容：
   ```env
   MONGODB_URI=mongodb://mongo:密码@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
   DB_NAME=questionnaire
   ```

**注意**：
- 本地连接通常会失败（连接超时），这是正常的
- 应用会自动使用本地文件系统存储，不影响开发
- 详细配置说明请参考 `配置MongoDB连接.md`

### 连接失败时的处理

如果看到以下错误信息：
```
MongoDB 连接失败: connection 2 to 170.106.146.155:28174 timed out
```

**这是正常的**，因为：
1. Zeabur MongoDB 只允许内部网络访问
2. 应用会自动降级到本地文件存储
3. 所有功能仍然正常工作
4. 数据会保存在 `data/` 目录

**在 Zeabur 生产环境中**，连接会自动成功，数据会保存到 MongoDB。

### 数据同步

如果需要从 MongoDB 同步数据到本地：

**方法 1：使用 API 导出（推荐，适用于本地无法连接的情况）**
```bash
npm run sync-api
```

**方法 2：直接连接 MongoDB（仅适用于可以连接的情况）**
```bash
npm run sync
```

详细说明请参考 `配置MongoDB连接.md`

## 数据存储

所有提交的数据会保存在 `data/` 目录下，使用统一的命名格式：

1. **主目录存储**：保存在 `data/` 目录，每个被选中的产品都会单独保存一条记录
   - 文件名格式：`[产品ID]_[产品名称]_[提交ID].json`
   - 例如：`1_玩偶_1764559903451.json`、`2_蓝色单肩包_1764559903451.json`

2. **产品分类目录**：同时保存在 `data/products/` 目录，使用相同的命名格式
   - 文件名格式：`[产品ID]_[产品名称]_[提交ID].json`
   - 例如：`1_玩偶_1764559903451.json`

### 目录结构
```
data/
├── 1_玩偶_1764559903451.json
├── 2_蓝色单肩包_1764559903451.json
├── 4_镜子_1764559903451.json
└── products/
    ├── 1_玩偶_1764559903451.json
    ├── 2_蓝色单肩包_1764559903451.json
    └── 4_镜子_1764559903451.json
```

**注意**：如果一个提交包含多个产品，会为每个产品在主目录和products目录各保存一个文件。

## 注意事项

1. 确保后端服务器在提交问卷前已经启动
2. 如果前端和后端不在同一域名，需要配置 CORS（已包含）
3. 数据文件保存在 `data/` 目录，请定期备份

