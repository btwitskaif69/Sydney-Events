const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Route to add a new email
router.post('/add-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Create a new user with the provided email
    const newUser = new User({ email });
    await newUser.save();
    res.status(201).json({ message: 'Email added successfully', email: newUser.email });
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate email error
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred while adding the email' });
    }
  }
});

module.exports = router;