module.exports = {
  scrapers: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each scraper to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false
  },
  api: {
    windowMs: 60 * 1000, // 1 minute
    max: 100
  }
};