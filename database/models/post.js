const mongoose = require('mongoose');
const comment = require('./comment.js');

const postSchema = new mongoose.Schema({
  restaurant: String,
  title: String,
  text: String,
  image: String,
  recommend: String,
  likes: Number,
  createdAt: Date,
  author: {
    username: String,
    avatar: String
  },
  comments: [comment.commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;