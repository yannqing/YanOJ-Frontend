# 使用 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制构建好的文件到 Nginx 的 html 目录
COPY dist/ ./

# 复制 Nginx 配置文件（可选）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]