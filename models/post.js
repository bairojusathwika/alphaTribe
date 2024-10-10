const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  stockSymbol: String,
  title: String,
  description: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likesCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);
