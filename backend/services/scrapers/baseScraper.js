const { launchBrowser } = require('../../config/puppeteer');
const logger = require('../../utils/logger');

class BaseScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await launchBrowser();
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1366, height: 768 });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async autoScroll() {
    await this.page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
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

  // Common error handler for all scrapers
  handleError(error) {
    logger.error(`[${this.constructor.name}] ${error.message}`);
    this.close();
  }
}

module.exports = BaseScraper;