# my-url-to-pdf-api

## PM2：

npm install pm2 -g

1. 开发环境
```bash
pm2 start pm2.config.js
```

2.生产环境启动：
```bash
pm2 start ecosystem.config.js --env production
```

3. 其他
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs

# 重启应用
pm2 restart url-to-pdf-api

# 停止应用
pm2 stop url-to-pdf-api

# 删除应用
pm2 delete url-to-pdf-api

# 监控
pm2 monit
```
