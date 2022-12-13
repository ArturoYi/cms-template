### 基础镜像，使用nginx镜像，最新稳定版
FROM nginx:1.21.1
# 默認容器和公網都是80，这里设置会被后续覆盖
EXPOSE 80
# 把本地dist拷貝到nginx默認的部署路徑
COPY /dist /usr/share/nginx/html
# 用本地配置文件来替换nginx的默认配置
COPY /nginx/conf/nginx.conf /etc/nginx/nginx.conf
# 啟動容進程的端口号
#注：只是声明展示使用的端口号，容器有自己的端口
# ENTRYPOINT 80

# 启动
CMD [nginx -g "daemon off;"]
