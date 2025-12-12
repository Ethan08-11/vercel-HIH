# Zeabur 部署故障排查指南

## Runtime Logs 无显示问题

### 问题现象

在 Zeabur 控制台的 "Runtime Logs" 中看到：
- "Waiting for runtime logs..."
- "No logs found with current settings"
- 即使服务状态显示 "RUNNING"，也没有日志输出

### 解决方案

**已优化代码**：应用现在会在启动时立即输出日志，确保 Zeabur 能捕获到。

**如果仍然看不到日志**，请检查：

1. **等待一段时间**：
   - 应用启动需要几秒钟
   - 等待 10-30 秒后刷新页面

2. **检查服务状态**：
   - 确认服务状态是 "RUNNING"（绿色）
   - 如果状态是 "Failed" 或 "Stopped"，查看 Build Logs

3. **查看 Build Logs**：
   - 切换到 "Build Logs" 标签
   - 检查构建是否成功
   - 如果有构建错误，先解决构建问题

4. **重新部署**：
   - 点击 "Redeploy"（重新部署）
   - 或推送新代码触发自动部署

5. **检查环境变量**：
   - 确认 `MONGODB_URI` 格式正确
   - 确认所有必需的环境变量都已设置

### 正常启动应该看到的日志

```
============================================================
🚀 应用开始启动...
   时间: 2024-01-01T12:00:00.000Z
   Node版本: v18.x.x
   工作目录: /app
============================================================
📋 模块加载完成，准备初始化服务器...
📋 服务器启动流程开始...
   进程ID: 1
   平台: linux
   架构: x64
📋 环境变量检查:
   NODE_ENV: production
   PORT: 3000
   MONGODB_URI: 已设置 (长度: xxx)
   ZEABUR: 1
🚀 开始初始化服务器...
✅ 服务器运行成功！
💓 [心跳] 服务器运行中 - 运行时间: 1秒, 内存: XXMB / XXMB
```

## 常见错误：Failed after 3 attempts. Last error: Internal Server Error

### 问题分析

这个错误通常表示应用在启动时崩溃了。可能的原因：

1. **MongoDB 连接失败导致应用崩溃**（已修复）
2. **应用代码错误**
3. **环境变量配置错误**
4. **端口冲突**
5. **依赖安装失败**

### 解决方案

#### 1. 检查 Zeabur Runtime Logs（最重要）

在 Zeabur 控制台：
1. 进入项目 `questionnaire-app`
2. 选择服务 `questionnaire-backend`
3. 点击 "Runtime Logs"（运行时日志）
4. 查看最新的错误信息

**关键信息**：
- 查找 `❌` 或 `ERROR` 标记的错误
- 查看错误堆栈（stack trace）
- 确认错误发生的时间点

#### 2. 检查环境变量

确保以下环境变量已正确配置：

```env
MONGODB_URI=mongodb://mongo:密码@sjc1.clusters.zeabur.com:28174/questionnaire?authSource=admin
DB_NAME=questionnaire
NODE_ENV=production
PORT=3000
```

**检查步骤**：
1. 进入 Zeabur 控制台
2. 选择服务 `questionnaire-backend`
3. 点击 "环境变量" (Environment Variables)
4. 确认所有变量都已设置

**常见错误**：
- ❌ `MONGODB_URI` 中主机名拼写错误（`sjcl` 应该是 `sjc1`）
- ❌ 端口号错误（`23654` 应该是 `28174`）
- ❌ 缺少数据库名称（应该是 `/questionnaire?authSource=admin`）

#### 3. MongoDB 连接失败处理

**重要**：应用已经优化，即使 MongoDB 连接失败，应用也会正常启动。

如果看到以下日志：
```
⚠️  数据库连接失败，应用将继续运行（数据仅本地有效）
```

**这是正常的**，应用会：
- ✅ 正常启动 HTTP 服务器
- ✅ 正常处理 API 请求
- ✅ 使用文件系统存储（如果 MongoDB 不可用）

**如果应用仍然崩溃**，可能是其他原因，请查看 Runtime Logs。

#### 4. 检查应用启动日志

在 Runtime Logs 中查找以下关键信息：

**正常启动应该看到**：
```
🚀 应用开始启动...
✅ HTTP服务器实例创建成功
✅ 服务器运行成功！
✅ 服务器已就绪，可以接受请求！
```

**如果看到错误**：
```
❌ 服务器启动失败
❌ 启动服务器时发生异常
```

请查看错误详情。

#### 5. 常见错误及解决方案

##### 错误 1：端口被占用
```
EADDRINUSE: address already in use
```

**解决方案**：
- 检查 `PORT` 环境变量是否正确
- Zeabur 会自动分配端口，通常不需要手动设置

##### 错误 2：模块未找到
```
Cannot find module 'xxx'
```

**解决方案**：
- 检查 `package.json` 是否包含所有依赖
- 确保 `node_modules` 已正确安装
- 重新部署应用

##### 错误 3：语法错误
```
SyntaxError: Unexpected token
```

**解决方案**：
- 检查代码语法
- 确保所有文件都已正确保存
- 检查是否有未关闭的括号或引号

##### 错误 4：MongoDB 连接超时
```
MongoNetworkTimeoutError: connection timed out
```

**解决方案**：
- 这是正常的，应用会自动降级到文件存储
- 如果应用因此崩溃，请检查最新代码（已修复）

#### 6. 重新部署

如果问题持续存在：

1. **检查代码**：
   - 确保所有更改已提交到 Git
   - 确保没有语法错误

2. **重新部署**：
   - 在 Zeabur 控制台点击 "Redeploy"（重新部署）
   - 或推送新代码到 Git 仓库

3. **查看部署日志**：
   - 在 Zeabur 控制台查看 "Build Logs"（构建日志）
   - 确认构建成功

#### 7. 健康检查

应用启动后，Zeabur 会进行健康检查。

**健康检查端点**：
- `GET /` - 应该返回 HTML 页面
- `GET /api/heart-counts` - 应该返回 JSON 数据

如果健康检查失败，应用会被标记为不健康。

#### 8. 联系支持

如果以上方法都无法解决问题：

1. **收集信息**：
   - Runtime Logs 的完整输出
   - Build Logs 的完整输出
   - 环境变量配置（隐藏敏感信息）
   - 错误发生的时间

2. **检查 Zeabur 状态**：
   - 访问 [Zeabur Status](https://status.zeabur.com)
   - 确认平台是否正常运行

## 快速诊断清单

- [ ] 检查 Runtime Logs 是否有错误
- [ ] 确认环境变量已正确配置
- [ ] 确认 `MONGODB_URI` 格式正确（主机名是 `sjc1`，不是 `sjcl`）
- [ ] 确认端口号是 `28174`，不是 `23654`
- [ ] 确认代码已正确提交到 Git
- [ ] 尝试重新部署应用
- [ ] 检查健康检查是否通过

## 预防措施

1. **代码测试**：
   - 在本地测试应用启动
   - 确保没有语法错误
   - 测试 MongoDB 连接失败的情况

2. **环境变量验证**：
   - 使用 `fix-env.ps1` 脚本验证 `.env` 文件
   - 在 Zeabur 中仔细检查环境变量

3. **日志监控**：
   - 定期查看 Runtime Logs
   - 关注错误和警告信息

## 相关文档

- `配置MongoDB连接.md` - MongoDB 连接配置详细说明
- `README_BACKEND.md` - 后端服务器使用说明
