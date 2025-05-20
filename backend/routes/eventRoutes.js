const express = require('express');
const router = express.Router();
const scrapeSydneyCom = require('../scrapers/Sydneycom');
const scrapeVividSydney = require('../scrapers/VividSydney');
const Event = require('../models/Event');

router.get('/scrape/sydney-com', async (req, res) => {
  try {
    const eventData = await scrapeSydneyCom();
    if (!eventData || !eventData.length) {
      return res.status(404).json({ message: 'No event data found' });
    }
    const savedEvents = await Event.insertMany(eventData);
    res.status(201).json(savedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// NEW: Save Vivid Sydney events to DB
router.get('/scrape/vivid-sydney', async (req, res) => {
  try {
    const eventData = await scrapeVividSydney();
    if (!eventData || !eventData.length) {
      return res.status(404).json({ message: 'No event data found' });
    }
    const savedEvents = await Event.insertMany(eventData);
    res.status(201).json(savedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;