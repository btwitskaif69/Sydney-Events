const express = require('express');
const router = express.Router();
const scrapeSydneyCom = require('../scrapers/temp');
const scrapeVividSydney = require('../scrapers/VividSydney');
const Event = require('../models/Event');

// Helper to filter out duplicates
async function filterNewEvents(events) {
  const links = events.map(e => e.event_link);
  const existing = await Event.find({ event_link: { $in: links } }).select('event_link');
  const existingLinks = new Set(existing.map(e => e.event_link));
  return events.filter(e => !existingLinks.has(e.event_link));
}

router.get('/scrape/sydney-com', async (req, res) => {
  try {
    const eventData = await scrapeSydneyCom();
    if (!eventData || !eventData.length) {
      return res.status(404).json({ message: 'No event data found' });
    }
    const newEvents = await filterNewEvents(eventData);
    if (!newEvents.length) {
      return res.status(200).json({ message: 'No new events to add', added: 0 });
    }
    const savedEvents = await Event.insertMany(newEvents);
    res.status(201).json({ message: 'Events added', added: savedEvents.length, events: savedEvents });
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
    const newEvents = await filterNewEvents(eventData);
    if (!newEvents.length) {
      return res.status(200).json({ message: 'No new events to add', added: 0 });
    }
    const savedEvents = await Event.insertMany(newEvents);
    res.status(201).json({ message: 'Events added', added: savedEvents.length, events: savedEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;