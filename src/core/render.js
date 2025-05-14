const puppeteer = require('puppeteer');
const _ = require('lodash');
const logger = require('../util/logger');

async function render(_opts = {}) {
  const opts = _.merge({
    cookies: [],
    scrollPage: false,
    emulateScreenMedia: true,
    ignoreHttpsErrors: false,
    html: null,
    viewport: {
      width: 1600,
      height: 1200,
    },
    goto: {
      waitUntil: 'networkidle0',
    },
    output: 'pdf',
    pdf: {
      format: 'A4',
      printBackground: true,
      fullPage: false,
      
      // margin 暂时写死，若有影响可去掉
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    },
    screenshot: {
      type: 'png',
      fullPage: true,

      // 截图区域，暂时写死，若有影响可去掉，x: 起始 X 坐标，y: 起始 Y 坐标，width: 截图宽度，height: 截图高度
      clip: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    },
    failEarly: false,
    waitFor: null, // 支持等待时间或选择器
  }, _opts);

  if ((_.get(_opts, 'pdf.width') && _.get(_opts, 'pdf.height')) || _.get(opts, 'pdf.fullPage')) {
    // pdf.format always overrides width and height, so we must delete it
    // when user explicitly wants to set width and height
    opts.pdf.format = undefined;
  }

  logOpts(opts);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: opts.ignoreHttpsErrors,
  });

  const page = await browser.newPage();
  await page.setViewport(opts.viewport);

  if (opts.emulateScreenMedia) {
    await page.emulateMediaType('screen');
  }

  if (opts.cookies && opts.cookies.length > 0) {
    await page.setCookie(...opts.cookies);
  }

  if (_.isString(opts.html)) {
    await page.setContent(opts.html, opts.goto);
  } else {
    await page.goto(opts.url, opts.goto);
  }

  if (opts.scrollPage) {
    logger.info('Scroll page ..');
    await scrollPage(page);
  }

  // await page.evaluate(async() => {
  //   const ele = document.querySelector('[comp-id="67"]')[0]
  //   console.log(ele, 111)
  //   // await ele.click();
  //   // const ele2 = document.getElementsByName('el-button--primary')[2]
  //   // await ele2.click();

  //   // const modal = document.querySelector('.custom-modal');

  //   // // 确保弹框在 PDF 中居中且不遮挡内容
  //   // modal.style.position = 'static';
  //   // modal.style.margin = '20px auto';
  //   // modal.style.boxShadow = 'none';
  // });

  if (opts.waitFor) {
    if (typeof opts.waitFor === 'string') {
      await page.waitForSelector(opts.waitFor);
    } else if (typeof opts.waitFor === 'number') {
      await page.evaluate((ms) => new Promise(resolve => setTimeout(resolve, ms)), opts.waitFor);
    }
  }

  let data;
  if (opts.output === 'pdf') {
    if (opts.pdf.fullPage) {
      const height = await getFullPageHeight(page);
      opts.pdf.height = height;
    }
    data = await page.pdf(opts.pdf);
  } else if (opts.output === 'html') {
    data = await page.content();
  } else {
    data = await page.screenshot(opts.screenshot);
  }

  await browser.close();
  return data;
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function getFullPageHeight(page) {
  const height = await page.evaluate(() => {
    const { body, documentElement } = document;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      documentElement.clientHeight,
      documentElement.scrollHeight,
      documentElement.offsetHeight
    );
  });
  return height;
}

function logOpts(opts) {
  const supressedOpts = _.cloneDeep(opts);
  if (opts.html) {
    supressedOpts.html = '...';
  }

  logger.info(`Rendering with opts: ${JSON.stringify(supressedOpts, null, 2)}`);
}

module.exports = { render };