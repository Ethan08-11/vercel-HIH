# MongoDB 连接字符串验证

## ✅ 你的连接字符串

```
mongodb://mongo:DV15sxhEU82YGmXR7FLwQ3a649CAZ0cH@sjc1.clusters.zeabur.com:25167/questionnaire?authSource=admin
```

## 🔍 格式验证

### ✅ 格式检查结果

| 项目 | 值 | 状态 |
|------|-----|------|
| **协议** | `mongodb://` | ✅ 正确 |
| **用户名** | `mongo` | ✅ 正确 |
| **密码** | `DV15sxhEU82YGmXR7FLwQ3a649CAZ0cH` | ✅ 正确 |
| **主机** | `sjc1.clusters.zeabur.com` | ✅ 正确（注意是数字 `1`） |
| **端口** | `25167` | ✅ 正确（与 MongoDB 服务页面一致） |
| **数据库** | `questionnaire` | ✅ 正确 |
| **authSource** | `admin` | ✅ 正确 |

### ✅ 格式完整性

- ✅ 以 `mongodb://` 开头
- ✅ 包含用户名和密码（用 `:` 分隔）
- ✅ 包含主机地址和端口
- ✅ 包含数据库名称 `/questionnaire`
- ✅ 包含认证源 `?authSource=admin`

**结论**：连接字符串格式**完全正确**！

---

## 🔧 在 Zeabur 中配置

### 步骤 1：进入后端服务

1. 进入 Zeabur 控制台
2. 找到你的后端服务（如 `questionnaire-backend`）
3. 点击进入服务详情页

### 步骤 2：添加/更新环境变量

1. 切换到 **"Environment Variables"** 或 **"环境变量"** 标签
2. 找到或添加 `MONGODB_URI` 环境变量
3. **变量值**设置为：
   ```
   mongodb://mongo:DV15sxhEU82YGmXR7FLwQ3a649CAZ0cH@sjc1.clusters.zeabur.com:25167/questionnaire?authSource=admin
   ```
4. 点击 **"Save"** 或 **"保存"**

### 步骤 3：添加 DB_NAME 环境变量（可选但推荐）

1. 添加另一个环境变量：
   - **变量名**：`DB_NAME`
   - **变量值**：`questionnaire`
2. 保存

### 步骤 4：等待重新部署

- 环境变量更新后，Zeabur 会自动触发重新部署
- 等待 1-2 分钟让部署完成

---

## ✅ 验证连接

### 方法 1：查看 Runtime Logs

1. 在服务详情页，切换到 **"Runtime Logs"** 或 **"运行时日志"**
2. 查找以下日志：

**成功连接**：
```
🔌 正在连接MongoDB...
✅ MongoDB 连接成功
   数据库: questionnaire
```

**连接失败**：
```
❌ MongoDB 连接失败
   错误消息: ...
```

### 方法 2：检查应用功能

1. 访问你的应用 URL
2. 执行一些操作（如点击爱心按钮）
3. 检查是否能正常保存数据

### 方法 3：检查健康检查端点

访问：
```
https://你的应用域名/health
```

应该返回 JSON 响应，包含服务器状态信息。

---

## 🔍 如果仍然连接失败

### 可能原因 1：MongoDB 服务未完全启动

**解决方案**：
1. 检查 MongoDB 服务状态是否为 "RUNNING"
2. 如果刚创建，等待 2-3 分钟让服务完全启动

### 可能原因 2：环境变量未正确保存

**解决方案**：
1. 确认环境变量已保存
2. 检查是否有拼写错误（特别是 `MONGODB_URI` 的大小写）
3. 确认没有多余的空格或换行符

### 可能原因 3：网络问题

**解决方案**：
1. 等待一段时间后重试
2. 检查 Zeabur 服务状态页面，看是否有平台级别的故障

### 可能原因 4：密码包含特殊字符

**检查**：你的密码 `DV15sxhEU82YGmXR7FLwQ3a649CAZ0cH` 不包含需要 URL 编码的特殊字符，所以不需要编码。

---

## 📋 完整环境变量配置清单

确保以下环境变量都已正确设置：

| 变量名 | 值 | 必需 |
|--------|-----|------|
| `MONGODB_URI` | `mongodb://mongo:DV15sxhEU82YGmXR7FLwQ3a649CAZ0cH@sjc1.clusters.zeabur.com:25167/questionnaire?authSource=admin` | ✅ 是 |
| `DB_NAME` | `questionnaire` | ⚠️ 推荐 |
| `NODE_ENV` | `production` | ⚠️ 可选 |
| `PORT` | （Zeabur 自动分配） | ❌ 不需要 |

---

## 🚨 常见错误

### ❌ 错误 1：端口号不匹配

**症状**：错误信息显示端口 `25167`，但环境变量中使用的是其他端口

**解决方案**：确保使用端口 `25167`（与 MongoDB 服务页面一致）

### ❌ 错误 2：主机名拼写错误

**错误示例**：
- `sjcl.clusters.zeabur.com`（字母 `l`）
- `sjcI.clusters.zeabur.com`（字母 `I`）

**正确**：`sjc1.clusters.zeabur.com`（数字 `1`）

### ❌ 错误 3：缺少数据库名称

**错误**：
```
mongodb://mongo:密码@sjc1.clusters.zeabur.com:25167?authSource=admin
```

**正确**：
```
mongodb://mongo:密码@sjc1.clusters.zeabur.com:25167/questionnaire?authSource=admin
```

### ❌ 错误 4：缺少 authSource

**错误**：
```
mongodb://mongo:密码@sjc1.clusters.zeabur.com:25167/questionnaire
```

**正确**：
```
mongodb://mongo:密码@sjc1.clusters.zeabur.com:25167/questionnaire?authSource=admin
```

---

## ✅ 你的配置总结

根据你提供的信息：

- ✅ **连接字符串格式**：完全正确
- ✅ **端口号**：`25167`（与 MongoDB 服务页面一致）
- ✅ **主机名**：`sjc1.clusters.zeabur.com`（正确，数字 `1`）
- ✅ **数据库名**：`questionnaire`（已包含）
- ✅ **认证源**：`admin`（已包含）

**配置看起来完全正确！**

如果仍然连接失败，请：
1. 查看 Runtime Logs 获取具体错误信息
2. 确认 MongoDB 服务状态为 "RUNNING"
3. 等待服务完全启动（如果是新创建的）

---

## 🔗 相关文档

- [Zeabur未知错误排查指南.md](./Zeabur未知错误排查指南.md) - 详细错误排查步骤
- [数据库连接与文件存储说明.md](./数据库连接与文件存储说明.md) - 连接失败时的降级机制
- [配置MongoDB连接.md](./配置MongoDB连接.md) - MongoDB 连接配置详细说明
