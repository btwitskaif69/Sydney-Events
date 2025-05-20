const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  image_url: String,
  description: String,
  price: String,
  event_link: String,
  tags: [String]
});

module.exports = mongoose.model('Event', eventSchema);