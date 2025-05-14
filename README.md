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

## Centos 8 环境
```bash
# 安装 Chromium 依赖
sudo dnf install -y \
  alsa-lib.x86_64 \
  atk.x86_64 \
  cups-libs.x86_64 \
  gtk3.x86_64 \
  ipa-gothic-fonts \
  libXcomposite.x86_64 \
  libXcursor.x86_64 \
  libXdamage.x86_64 \
  libXext.x86_64 \
  libXi.x86_64 \
  libXrandr.x86_64 \
  libXScrnSaver.x86_64 \
  libXtst.x86_64 \
  pango.x86_64 \
  xorg-x11-fonts-100dpi \
  xorg-x11-fonts-75dpi \
  xorg-x11-fonts-cyrillic \
  xorg-x11-fonts-misc \
  xorg-x11-fonts-Type1 \
  xorg-x11-utils \
  GConf2 \
  Xvfb
```