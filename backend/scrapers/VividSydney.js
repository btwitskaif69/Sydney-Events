const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.vividsydney.com/events';

const scrapeVividSydney = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  // Infinite scroll logic: scroll until no new cards are loaded
  let previousCount = 0;
  let sameCountTimes = 0;
  while (sameCountTimes < 5) { // Try 5 times with no new cards before stopping
    const currentCount = await page.evaluate(() =>
      document.querySelectorAll('.gtm-search-results-event-tile-link').length
    );
    // Scroll to bottom, then up a bit, then bottom again to trigger loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(res => setTimeout(res, 1500));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 500));
    await new Promise(res => setTimeout(res, 500));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(res => setTimeout(res, 1500));
    const newCount = await page.evaluate(() =>
      document.querySelectorAll('.gtm-search-results-event-tile-link').length
    );
    if (newCount === currentCount && currentCount === previousCount) {
      sameCountTimes++;
    } else {
      sameCountTimes = 0;
    }
    previousCount = newCount;
  }

  // Scrape all event cards
  const events = await page.evaluate(() => {
    const cards = document.querySelectorAll('.gtm-search-results-event-tile-link');
    const eventList = [];

    cards.forEach(card => {
      // Event link
      const event_link = card.href.startsWith('http') ? card.href : `https://www.vividsydney.com${card.getAttribute('href')}`;

      // Image URL
      const image_url = card.querySelector('picture img')?.getAttribute('data-srcset') ||
                        card.querySelector('picture img')?.getAttribute('src') || '';

      // Title
      const title = card.querySelector('h3 span')?.innerText.trim() || '';

      // Date
      const date = card.querySelector('svg + p')?.innerText.trim() || '';

      // Location
      const location = card.querySelectorAll('.c022187 p')[1]?.innerText.trim() || '';

      // Description
      const description = card.querySelector('.c022178 p')?.innerText.trim() || '';

      // Price
      const price = card.querySelector('.c022183 p')?.innerText.trim() || '';

      // Tags (e.g. Highlight, Free, etc.)
      const tags = [];
      const tagEl = card.parentElement.querySelector('.c022217 span');
      if (tagEl) tags.push(tagEl.innerText.trim());
      if (price && price.toLowerCase().includes('free')) tags.push('Free');

      eventList.push({
        title,
        date,
        location,
        image_url,
        description,
        price,
        event_link,
        tags,
      });
    });

    return eventList;
  });

  await browser.close();
  return events;
};

if (require.main === module) {
  scrapeVividSydney().then(events => {
    console.log(events.length, events);
  }).catch(err => {
    console.error('Error scraping events:', err);
  });
}

module.exports = scrapeVividSydney;