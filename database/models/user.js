const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  location: String,
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;

