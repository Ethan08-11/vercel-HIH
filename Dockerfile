# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖（sharp 需要）
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev \
    && rm -rf /var/cache/apk/*

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（使用 npm ci 以获得更快的、可靠的、可重复的构建）
# 注意：Zeabur 会自动设置 NODE_ENV=production，所以这里安装生产依赖
RUN npm ci --only=production && npm cache clean --force

# 复制应用代码
COPY . .

# 创建必要的目录
RUN mkdir -p data/products

# 暴露端口（Zeabur 会自动分配端口，这里只是声明）
EXPOSE 3000

# 设置环境变量（Zeabur 会覆盖 PORT，这里设置默认值）
ENV NODE_ENV=production
ENV PORT=3000

# 健康检查（Zeabur 使用动态端口，健康检查使用环境变量 PORT）
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动应用（使用 node 直接启动，确保错误能被捕获）
CMD ["node", "server.js"]
