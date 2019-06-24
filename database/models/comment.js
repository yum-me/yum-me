const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    username: String,
    avatar: String
  },  
  createdAt: Date
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment, commentSchema };