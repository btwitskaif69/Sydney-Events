const express = require('express');
const router = express.Router();
const scrapeSydneyCom = require('../scrapers/sydneycom');
const scrapeVividSydney = require('../scrapers/VividSydney');

router.get('/city-of-sydney', async (req, res) => {
  try {
    const data = await scrapeSydneyCom();
    if (!data || !data.length) return res.status(404).json({ message: 'No event data found' });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
});

// NEW: Vivid Sydney route
router.get('/vivid-sydney', async (req, res) => {
  try {
    const data = await scrapeVividSydney();
    if (!data || !data.length) return res.status(404).json({ message: 'No event data found' });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
});

module.exports = router;