const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;