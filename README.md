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

### 安装
```bash
# 国内下载不了chrome，先跳过，设置环境变量并安装 Puppeteer
export PUPPETEER_SKIP_DOWNLOAD=true
npm install puppeteer


# 启用 PowerTools 仓库（CentOS 8 需手动启用）
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# 安装依赖库
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

### linux 配置本地下载 chromium 解压路径

[https://registry.npmmirror.com/binary.html?path=chromium-browser-snapshots/Linux_x64/1453008/]

```bash
# 使用淘宝镜像下载 Chromium（替换版本号）
# 访问 https://registry.npmmirror.com/binary.html?path=chromium-browser-snapshots/ 查看最新版本
wget https://registry.npmmirror.com/-/binary/chromium-browser-snapshots/Linux_x64/901912/chrome-linux.zip

# 解压并移动到项目目录
unzip chrome-linux.zip -d ./chromium
```

```js
// render.js 里
const browser = await puppeteer.launch({

    // 手动指定本地下载的chromium 解压路径
    executablePath: '/data/testdir/chromium/chrome-linux/chrome'

    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: opts.ignoreHttpsErrors,
});
```
