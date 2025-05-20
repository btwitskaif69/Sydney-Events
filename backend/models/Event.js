const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  date: { type: Date, index: true },
  location: {
    name: String,
    address: String,
    coordinates: {
      type: [Number],  // [longitude, latitude]
      index: '2dsphere'
    }
  },
  image: {
    url: String,
    source: String
  },
  description: String,
  ticketLinks: [{
    url: String,
    platform: String,
    lastChecked: Date
  }],
  organizer: {
    name: String,
    email: String,
    contact: String
  },
  tags: [{ type: String, index: true }],
  source: {
    name: { type: String, required: true },
    url: { type: String, required: true }
  },
  metadata: {
    firstSeen: { type: Date, default: Date.now },
    lastUpdated: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);