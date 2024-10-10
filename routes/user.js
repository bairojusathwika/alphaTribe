const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get user profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user);
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { username, bio, profilePicture } = req.body;
  await User.findByIdAndUpdate(req.userId, { username, bio, profilePicture });
  res.json({ success: true, message: 'Profile updated' });
});

module.exports = router;
