const User = require('../database/models/user')
const Post = require('../database/models/post')
const Comment = require('../database/models/comment')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const yelp = require('yelp-fusion');
const db = require('../database/index.js');

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
  
  register: (req, res) => {
    const { username, firstName, lastName, email, password, password2, avatar, location } = req.body;
    console.log(req.body)
    let errors = [];

    if (!username || !firstName || !lastName || !email || !password || !password2 || !avatar, !location) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.status(404).send('Submit Everything Please')
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          res.status(404).send('User is exist')
        } else {
          const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password,
            location,
            avatar
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.status(200).send('Registered')
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  },
  login: (req, res) => {
    const { email, password } = req.query;
    User.findOne({ email: email })
      .then(user => {
        console.log(user.password);
        if (user) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(404).send('Password is wrong')
            }
            if (isMatch) {
              res.status(200).send(user)

            } else {
              res.status(404).send('Wrong email or password')
            }
          })
        } else {
          res.status(404).send('Wrong email or password')
        }
      })
      .catch(err => res.status(404).send('Wrong email or passsword'))
  },
  restaurant: (req, res) => {
    
    const apiKey = `${process.env.KEY}`;

    const searchRequest = {
      term: req.query.term,
      location: req.query.location,
      categories: 'Food'
    };

    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses.slice(0,10);
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
      res.status(200).send(JSON.parse(prettyJson))
    }).catch(err => {
      console.log(err)
      res.status(404).send('Error getting restaurants',err)
    });
  },
  writepost: (req, res) => {
    const { restaurant, title, text, image,author, recommend, createdAt } = req.body;
    Post.create({restaurant, title, text, image, author, recommend, createdAt})
      .then(() => res.status(201).send('Succesfully posted'))
      .catch(err => res.status(404).send('Error posting',err))
  },

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
  },
  //Show one post, /post
  getPost: (req, res) => {
    const { _id } = req.query;

    // Comment.aggregate([{ $sort : { createdAt : -1} } ])
    Post.find({_id})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send('Error with getPost', err))
  }, 
  //Get all posts of one username, /userPosts
  getUserPosts: (req, res) => {
    const { username } = req.query;
    Post.find({'author.username': username})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send('Error with getUserPosts', err))
  }, 
  //Get all posts of people you are following, /feed
  getFeed: (req, res) => {
    const { username } = req.query;
    User.find({username})
    .then(data => {
      const followingArr = data[0].following
      return followingArr
    })
    .then((arr) => Post.find({'author.username': {$in: arr}}).sort({createdAt: -1 }))
    // .limit(20)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send('Error with getFeed', err))
  }, 
  //Get user info, /user
  getUser: (req, res) => {
    const { username } = req.query;
    User.find({username})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send('Error with getUser', err))
  },
  //Upvote a post, /post/like
  upvote: (req, res) => {
    const { _id } = req.body;
    Post.findOneAndUpdate({ _id }, {$inc: {likes: 1}})
    .then(response => res.status(200).send(response))
    .catch(err => {res.status(400).send('Error liking post', err) });
  },
  //Downvote a post, /post/unlike
  downvote: (req, res) => {
    const { _id } = req.body;
    Post.findOneAndUpdate({ _id}, {$inc: {likes: -1}})
    .then(response => res.status(200).send(response))
    .catch(err => {res.status(400).send('Error unliking post', err) });
  },
  //Adding a comment to a post, /comment
  addComment: (req, res) => {
    const { _id } = req.query;
    const { text } = req.body; 
    Comment.Comment.create({text: text, 'author.username': 'ufukmehmetoglu', 'author.avatar': 'https://avatars1.githubusercontent.com/u/43357768?s=460&v=4', createdAt: new Date()})
    .then(comment => Post.findOneAndUpdate(_id, {$push: {'comments': comment}}))
    .then(response => res.status(200).send(response))
    .catch(err => {res.status(400).send('Error adding comment', err)});
  },
  //Follow a user, /user/follow
  followUser: (req, res) => {
    const { username, followUser } = req.body;
    User.findOneAndUpdate({username: followUser}, {$inc: {followers: 1}})
    .then(() => User.findOneAndUpdate(username, {$push: {'following': followUser}}))
    .then(response => res.status(200).send(response))
    .catch(err => res.status(404).send('Error with followUser', err))
  },
  //Unfollow a user /user/unfollow
  unfollowUser: (req, res) => {
    const { username, followUser } = req.body;
    User.findOneAndUpdate({username: followUser}, {$inc: {followers: -1}})
    .then(() => User.findOneAndUpdate({username: username}, {$pull: {'following': followUser}}))
    .then(response => res.status(200).send(response))
    .catch(err => res.status(404).send('Error with unFollowUser', err))
  },
  //Check if the user is following a different member /user/follow
  checkFollow: (req, res) => {
    const { username, followUser} = req.query;
    User.find({username})
    .then(data => {
      let bool = false;
      for(let i = 0; i < data[0]['following'].length; i++) {
        if(data[0]['following'][i] === followUser) {
          bool = true;
        }
      }
      res.status(200).send(bool); 
    })
    .catch(err => res.status(404).send('Error with checkFollow', err))
  }
}

