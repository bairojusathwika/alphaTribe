const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a stock post
router.post('/', authMiddleware, async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  const post = new Post({ stockSymbol, title, description, tags, userId: req.userId });
  await post.save();
  res.json({ success: true, postId: post._id, message: 'Post created successfully' });
});

// Get all posts
router.get('/', async (req, res) => {
  const { stockSymbol, tags, sortBy, page = 1, limit = 10 } = req.query;
  const query = {};
  if (stockSymbol) query.stockSymbol = stockSymbol;
  if (tags) query.tags = { $in: tags.split(',') };

  const sort = sortBy === 'likes' ? { likesCount: -1 } : { createdAt: -1 };
  const posts = await Post.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit));
  res.json(posts);
});

// Get a single post
router.get('/:postId', async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('userId', 'username');
  const comments = await Comment.find({ postId: req.params.postId });
  res.json({ ...post.toObject(), comments });
});

// Delete a post
router.delete('/:postId', authMiddleware, async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);
  res.json({ success: true, message: 'Post deleted successfully' });
});

module.exports = router;
