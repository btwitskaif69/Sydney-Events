const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.vividsydney.com/events';

const scrapeVividSydney = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set larger viewport and wait longer for stable DOM
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });

  // Improved scroll logic with element tracking
  let lastElementCount = 0;
  let attempts = 0;
  
  while (attempts < 15) {
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(res => setTimeout(res, 2000));
    });

    const currentCount = await page.$$eval(
      '.gtm-search-results-event-tile-link',
      els => els.length
    );

    if (currentCount === lastElementCount) {
      attempts++;
    } else {
      attempts = 0;
      lastElementCount = currentCount;
    }
    
    await new Promise(res => setTimeout(res, 1500));
  }

  // Add stabilization delay before scraping
  await new Promise(res => setTimeout(res, 3000));

  // Enhanced scraping with DOM verification
  const events = await page.$$eval('.gtm-search-results-event-tile-link', cards => {
    // Verify DOM state
    if (!cards.length) return [];
    const testDate = cards[0].querySelector('.c022198 > .c022195');
    if (!testDate) throw new Error('DOM structure changed');

    return cards.map(card => {
      // Helper function for safe text extraction
      const getText = (selector, parent = card) => {
        const el = parent.querySelector(selector);
        return el ? el.textContent.trim() : '';
      };

      // Link handling
      const href = card.href || card.getAttribute('href');
      const event_link = href.startsWith('http') ? href 
        : `https://www.vividsydney.com${href}`;

      // Image handling with fallback
      const picture = card.querySelector('picture');
      const sources = picture?.querySelectorAll('source') || [];
      const srcset = sources[0]?.srcset || sources[0]?.dataset.srcset || '';
      const image_url = srcset.split(',')
        .pop()
        .trim()
        .split(' ')[0]
        .replace(/^\/\//, 'https://')
        .replace(/^\//, 'https://www.vividsydney.com/');

      // Core data extraction
      const title = getText('h3 span');
      
      const infoBlocks = Array.from(card.querySelectorAll('.c022198 > .c022195'));
      const date = infoBlocks[0] ? getText('p', infoBlocks[0]) : '';
      const location = infoBlocks[1] ? getText('p', infoBlocks[1]) : '';
      
      const description = getText('.c022186');
      const price = getText('.c022188 .c022191 p');

      // Tags handling
      const tags = [];
      const highlightTag = card.closest('div').querySelector('.c022225 span');
      if (highlightTag) tags.push(highlightTag.textContent.trim());
      if (/free/i.test(price)) tags.push('Free');

      return {
        title,
        date,
        location,
        image_url,
        description,
        price,
        event_link,
        tags: [...new Set(tags)] // Remove duplicates
      };
    });
  });

  await browser.close();
  return events.filter(e => e.title); // Filter out empty items
};

// Run and handle errors
if (require.main === module) {
  scrapeVividSydney()
    .then(events => {
      console.log(`Successfully scraped ${events.length} events`);
      console.log(events.slice(0, 2)); // Sample output
    })
    .catch(err => {
      console.error('Scraping failed:');
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = scrapeVividSydney;