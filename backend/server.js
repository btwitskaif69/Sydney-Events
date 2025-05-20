require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const scrapeSydneyCom = require('./scrapers/sydneycom');
const scrapeVividSydney = require('./scrapers/VividSydney');
const Event = require('./models/Event');
const cron = require('node-cron');
const cors = require('cors'); // Add this

const app = express();
const PORT = process.env.PORT || 5000;

// Parse allowed origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());
app.use('/api/events', eventRoutes);

// Helper to filter out duplicates
async function filterNewEvents(events) {
  const links = events.map(e => e.event_link);
  const existing = await Event.find({ event_link: { $in: links } }).select('event_link');
  const existingLinks = new Set(existing.map(e => e.event_link));
  return events.filter(e => !existingLinks.has(e.event_link));
}

// Schedule the job to run every day at 3am
cron.schedule('0 3 * * *', async () => {
  console.log('Starting scheduled scrape at 3am...');
  try {
    // Sydney.com
    const sydneyEvents = await scrapeSydneyCom();
    const newSydneyEvents = await filterNewEvents(sydneyEvents);
    if (newSydneyEvents.length) {
      await Event.insertMany(newSydneyEvents);
      console.log(`Added ${newSydneyEvents.length} new Sydney.com events`);
    } else {
      console.log('No new Sydney.com events to add');
    }

    // Vivid Sydney
    const vividEvents = await scrapeVividSydney();
    const newVividEvents = await filterNewEvents(vividEvents);
    if (newVividEvents.length) {
      await Event.insertMany(newVividEvents);
      console.log(`Added ${newVividEvents.length} new Vivid Sydney events`);
    } else {
      console.log('No new Vivid Sydney events to add');
    }
  } catch (err) {
    console.error('Scheduled scrape failed:', err);
  }
}, {
  timezone: "Australia/Sydney" // Ensures 3am Sydney time
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));