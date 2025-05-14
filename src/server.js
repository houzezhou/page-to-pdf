const express = require('express');
const { render } = require('./core/render');
const app = express();
const port = 3000;
const logger = require('./util/logger');

app.use(express.json());

app.post('/render', async (req, res) => {
  try {
    const data = await render(req.body);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/render', async (req, res) => {
  try {
    const { url, width, height, format, printBackground, scrollPage, waitFor, fullPage } = req.query;

    if (!url) {
      logger.error('URL is required');
      return res.status(400).json({ error: 'URL is required' });
    }

    logger.info(`Rendering URL: ${url}`);
    const pdf = await render({
      url,
      viewport: {
        width: parseInt(width) || 1600,
        height: parseInt(height) || 1200,
      },
      pdf: {
        format: format || 'A4',
        printBackground: printBackground || true,
        fullPage: fullPage || false,
        // width:2000
      },
      scrollPage: scrollPage === 'true',
      waitFor: waitFor || null,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    if (error.message.includes('Navigation timeout')) {
      logger.error('Page loading timeout');
      res.status(504).json({ error: 'Page loading timeout' });
    } else {
      logger.error(`Error rendering PDF: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
