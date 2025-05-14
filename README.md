# page-to-pdf

## PM2：

npm install pm2 -g

1. 开发环境
```bash
pm2 start pm2.config.js
```

2.生产环境启动：
```bash
pm2 start pm2.config.js --env production
```

3. 其他
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs

# 重启应用
pm2 restart page-to-pdf

# 停止应用
pm2 stop page-to-pdf

# 删除应用
pm2 delete page-to-pdf

# 监控
pm2 monit
```
