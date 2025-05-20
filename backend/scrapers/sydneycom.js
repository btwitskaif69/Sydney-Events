const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.sydney.com/events?';

const scrapeSydneyCom = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  // Infinite scroll logic
  let previousHeight;
  let reachedEnd = false;
while (!reachedEnd) {
  previousHeight = await page.evaluate('document.body.scrollHeight');
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await new Promise(res => setTimeout(res, 2000)); // Wait for new events to load

  // Try clicking "Load More" if it exists
  try {
    await page.click('.load-more__button');
    await new Promise(res => setTimeout(res, 1500));
  } catch (err) {
    // Button not found or not clickable, ignore
  }

  // Check if more events loaded
  const newHeight = await page.evaluate('document.body.scrollHeight');
  if (newHeight === previousHeight) {
    reachedEnd = true;
  }
}

  // Now scrape all event cards
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