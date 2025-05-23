require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const cron      = require('node-cron');

const eventRoutes  = require('./routes/eventRoutes');
const emailRoutes  = require('./routes/emailRoutes');
const scrapeSydney = require('./scrapers/SydneyCom');
const scrapeVivid  = require('./scrapers/VividSydney');
const Event        = require('./models/Event');

const app = express();
const PORT = process.env.PORT || 5000;

// Make sure FRONTEND_URL is actually defined:
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!FRONTEND_URL) {
  console.warn(
    '⚠️  FRONTEND_URL is not defined in your environment. ' +
    'CORS will only allow localhost:5173!'
  );
}

// Allow both your prod URL and localhost:5173 for dev:
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
].filter(Boolean);

// -- 1) JSON parser (in case you need it in routes) --
app.use(express.json());

// -- 2) CORS middleware --
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// -- 3) Mount API routes *after* CORS is enabled --
//    This is critical so every /api/events request
//    gets the right CORS headers!
app.use('/api/events', eventRoutes);
app.use('/api/emails', emailRoutes);

// -- 4) Duplicate-filter helper & scheduled scraping --
async function filterNewEvents(events) {
  const links = events.map(e => e.event_link);
  const existing = await Event.find({ event_link: { $in: links } })
                              .select('event_link');
  const existingSet = new Set(existing.map(e => e.event_link));
  return events.filter(e => !existingSet.has(e.event_link));
}

cron.schedule('0 3 * * *', async () => {
  console.log('⏰ Scheduled scrape at 3am Sydney time');
  try {
    const sydney = await scrapeSydney();
    const newSydney = await filterNewEvents(sydney);
    if (newSydney.length) {
      await Event.insertMany(newSydney);
      console.log(`Added ${newSydney.length} new Sydney.com events`);
    }
    const vivid = await scrapeVivid();
    const newVivid = await filterNewEvents(vivid);
    if (newVivid.length) {
      await Event.insertMany(newVivid);
      console.log(`Added ${newVivid.length} new Vivid Sydney events`);
    }
  } catch (err) {
    console.error('❌ Scheduled scrape failed', err);
  }
}, { timezone: 'Australia/Sydney' });

// -- 5) Connect & start server --
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
