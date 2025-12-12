# 配置 MongoDB 连接字符串

## 🎯 快速配置（当前服务器）

**直接使用以下连接字符串**（已根据当前服务器信息配置）：

```env
MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
DB_NAME=questionnaire
```

### 在 Zeabur 中配置

1. 进入项目 `questionnaire-app`
2. 选择服务 `questionnaire-backend`
3. 点击 "环境变量" (Environment Variables)
4. 添加环境变量：
   - **变量名**: `MONGODB_URI`
   - **变量值**: `mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin`
5. 保存后，Zeabur 会自动重新部署

## 📋 从 Zeabur 获取连接信息

在 Zeabur 的 MongoDB 服务页面，你会看到以下字段：

### ✅ 应该使用的字段：**MongoDB connection string**

这是完整的连接字符串，格式类似：
```
mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
```

**直接复制这个字段的值即可！**

**当前服务器信息**：
- 主机: `sjc1.clusters.zeabur.com`
- 端口: `28174`
- 用户名: `mongo`
- 密码: `bNv0OPw2C34V97GQMnYo18augx65Lldq`
- 数据库: `questionnaire`

### ❌ 不要单独使用这些字段：
- MongoDB username（只是用户名）
- MongoDB password（只是密码）
- MongoDB host（只是主机地址）
- MongoDB port（只是端口号）

## 🔧 配置步骤

### 方法一：使用 .env 文件（推荐）

1. **在项目根目录创建 `.env` 文件**

2. **复制 MongoDB connection string 的值**

3. **在 .env 文件中添加：**
   ```env
   MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
   DB_NAME=questionnaire
   ```

   ⚠️ **注意**：这是当前服务器的实际连接字符串，可以直接使用

4. **保存文件**

5. **运行同步命令：**
   ```bash
   npm run sync
   ```

### 方法二：手动构建连接字符串

如果只有单独的字段，可以手动构建：

**格式：**
```
mongodb://用户名:密码@主机:端口/数据库名?authSource=admin
```

**示例（当前服务器）：**
```env
MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
```

**字段对应关系：**
- `mongo` - 从 "MongoDB username" 获取
- `bNv0OPw2C34V97GQMnYo18augx65Lldq` - 从 "MongoDB password" 获取（点击眼睛图标显示）
- `sjc1.clusters.zeabur.com` - 从 "MongoDB host" 获取
- `28174` - 从 "MongoDB port" 获取
- `questionnaire` - 数据库名称（通常是 `questionnaire`）

### 方法三：使用命令行（临时）

Windows:
```cmd
set MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
set DB_NAME=questionnaire
node sync-data.js
```

Linux/Mac:
```bash
export MONGODB_URI="mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin"
export DB_NAME=questionnaire
node sync-data.js
```

## 🔍 验证连接字符串格式

正确的连接字符串应该：
- ✅ 以 `mongodb://` 或 `mongodb+srv://` 开头
- ✅ 包含用户名和密码
- ✅ 包含主机地址和端口
- ✅ 包含数据库名称
- ✅ 可能包含 `?authSource=admin` 参数

**示例格式：**
```
mongodb://username:password@host:port/database?authSource=admin
```

## ⚠️ 常见错误

### 错误 1：只复制了部分信息
❌ 错误：
```env
MONGODB_URI=sjc1.clusters.zeabur.com
```

✅ 正确：
```env
MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
```

### 错误 2：密码包含特殊字符未转义
如果密码包含特殊字符（如 `@`, `#`, `%` 等），需要进行 URL 编码：
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`

### 错误 3：缺少数据库名称
确保连接字符串中包含数据库名称（通常是 `questionnaire`）

## 📝 完整示例

**当前服务器信息**：
- Username: `mongo`
- Password: `bNv0OPw2C34V97GQMnYo18augx65Lldq`
- Host: `sjc1.clusters.zeabur.com`
- Port: `28174`
- Database: `questionnaire`

那么 `.env` 文件应该是：
```env
MONGODB_URI=mongodb://mongo:bNv0OPw2C34V97GQMnYo18augx65Lldq@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
DB_NAME=questionnaire
```

**注意**：当前密码不包含需要 URL 编码的特殊字符，可以直接使用

## 🚀 测试连接

配置完成后，运行：
```bash
npm run sync
```

如果看到：
```
✅ MongoDB 连接成功
📥 正在获取数据...
```

说明连接配置正确！

## 💡 提示

1. **使用复制按钮**：在 Zeabur 页面上，每个字段旁边都有复制图标，点击即可复制
2. **隐藏/显示密码**：点击眼睛图标可以显示或隐藏密码
3. **保存安全**：`.env` 文件包含敏感信息，不要提交到 Git 仓库（已在 .gitignore 中）

