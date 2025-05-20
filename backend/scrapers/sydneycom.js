const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.sydney.com/events?';

const scrapeSydneyCom = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  // Wait for event cards to load
  await page.waitForSelector('.tile__product-list', { timeout: 15000 });

  // Scrape all event preview links from the main events page
  const events = await page.evaluate(() => {
    const cards = document.querySelectorAll('.tile__product-list');
    const eventList = [];

    cards.forEach(card => {
      const title = card.querySelector('.tile__product-list-tile-heading h3')?.innerText.trim() || '';
      const event_link = card.querySelector('a.tile__product-list-link')?.href || '';
      const location = card.querySelector('.tile__area-name')?.innerText.trim() || '';
      const image_url = card.querySelector('picture img')?.src || '';
      const description = card.querySelector('.prod-desc')?.innerText.trim() || '';
      // Dates
      const startDate = card.querySelector('.start-date')?.getAttribute('datetime') || '';
      const endDate = card.querySelector('.end-date')?.getAttribute('datetime') || '';
      const date = startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate;
      // Price (not always present)
      const price = card.querySelector('.tile__product-list-price')?.innerText.trim() || '';
      // Tags (not always present)
      const tags = [];
      card.querySelectorAll('.tile__product-list-tags .tile__product-list-tag').forEach(tagEl => {
        tags.push(tagEl.innerText.trim());
      });

      eventList.push({
        title,
        date,
        time: '', // Not available on card
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
  scrapeSydneyCom().then(events => {
    console.log(events);
  }).catch(err => {
    console.error('Error scraping events:', err);
  });
}

module.exports = scrapeSydneyCom;