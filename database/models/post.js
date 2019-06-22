const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  restaurant: String,
  title: String,
  text: String,
  images: [String],
  rating: String,
  likes: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    avatar: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;