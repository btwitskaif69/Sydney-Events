require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const scrapeSydneyCom = require('./scrapers/SydneyCom');
const scrapeVividSydney = require('./scrapers/VividSydney');
const Event = require('./models/Event');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use ALLOWED_ORIGINS from .env
const FRONTEND_URL = process.env.FRONTEND_URL; // Default to Vercel URL
const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173']; // Add both URLs

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) { // Allow if the origin is in the list or undefined (for non-browser requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use('/api/events', eventRoutes);


const emailRoutes = require('./routes/emailRoutes');
app.use('/api/emails', emailRoutes);

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
  timezone: "Australia/Sydney"
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));