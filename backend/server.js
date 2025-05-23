require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const eventRoutes = require('./routes/eventRoutes');
const emailRoutes = require('./routes/emailRoutes');
const scrapeSydneyCom = require('./scrapers/SydneyCom');
const scrapeVividSydney = require('./scrapers/VividSydney');
const Event = require('./models/Event');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL; // e.g. https://sydney-events-finder.vercel.app
const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Also explicitly set headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// ─── MOUNT ROUTES ────────────────────────────────────────────────────────────────
// Mount your event routes _after_ CORS so /api/events works correctly
app.use('/api/events', eventRoutes);

// Mount email-sending routes
app.use('/api/emails', emailRoutes);

// ─── DUPLICATE FILTER HELPER ─────────────────────────────────────────────────────
async function filterNewEvents(events) {
  const links = events.map(e => e.event_link);
  const existing = await Event.find({ event_link: { $in: links } })
                              .select('event_link');
  const existingLinks = new Set(existing.map(e => e.event_link));
  return events.filter(e => !existingLinks.has(e.event_link));
}

// ─── SCHEDULED SCRAPING ─────────────────────────────────────────────────────────
cron.schedule('0 3 * * *', async () => {
  console.log('Starting scheduled scrape at 3am Sydney time...');
  try {
    // Sydney.com
    const sydneyEvents = await scrapeSydneyCom();
    const newSydney = await filterNewEvents(sydneyEvents);
    if (newSydney.length) {
      await Event.insertMany(newSydney);
      console.log(`Added ${newSydney.length} new Sydney.com events`);
    } else {
      console.log('No new Sydney.com events to add');
    }
    // Vivid Sydney
    const vividEvents = await scrapeVividSydney();
    const newVivid = await filterNewEvents(vividEvents);
    if (newVivid.length) {
      await Event.insertMany(newVivid);
      console.log(`Added ${newVivid.length} new Vivid Sydney events`);
    } else {
      console.log('No new Vivid Sydney events to add');
    }
  } catch (err) {
    console.error('Scheduled scrape failed:', err);
  }
}, {
  timezone: 'Australia/Sydney'
});

// ─── DATABASE & SERVER START ────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
