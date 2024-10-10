const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add a comment
router.post('/', authMiddleware, async (req, res) => {
  const comment = new Comment({
    postId: req.params.postId,
    userId: req.userId,
    comment: req.body.comment
  });
  await comment.save();
  res.json({ success: true, commentId: comment._id, message: 'Comment added successfully' });
});

// Delete a comment
router.delete('/:commentId', authMiddleware, async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.json({ success: true, message: 'Comment deleted successfully' });
});

module.exports = router;
