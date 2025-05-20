// services/scrapers/scraperFactory.js
const scrapers = {
  eventbrite: require('./websiteScrapers/eventbriteScraper'),
  // Add all other scrapers
};

class ScraperFactory {
  static createScraper(website) {
    const ScraperClass = scrapers[website];
    if (!ScraperClass) {
      throw new Error(`No scraper found for ${website}`);
    }
    return new ScraperClass();
  }
}

module.exports = ScraperFactory;