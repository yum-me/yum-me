const Post = require('../database/models/post.js');
const User = require('../database/models/user.js');
const db = require('../database/index.js');

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {

  findRecent: (req, res) => {
    Post.find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send('Could not find recent posts: ', err));
  },

  search: (req, res) => {
    if(req.query.term) {
      const regex = new RegExp(escapeRegex(req.query.term), 'gi');
      Post.find({ $or:[{ restaurant: regex }, { title: regex }] }, (err, foundPosts) => {
        if(err) {
          res.status(404).send(err);
        } else {
          User.find({ username: regex }, function(err, foundUsers) {
            if(err) {
              res.status(404).send(err)
            } else {
              let result = { foundPosts, foundUsers };
              res.status(200).send(result);
            }
          });
        }
      }); 
    }
  }

}