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

