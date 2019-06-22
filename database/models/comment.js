const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    avatar: String
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;