const User = require('../database/models/user')
const Post = require('../database/models/post')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const yelp = require('yelp-fusion');

module.exports = {
  register: (req, res) => {
    const { username, firstName, lastName, email, password, password2 } = req.body;
    console.log(req.body)
    let errors = [];

    if (!username || !firstName || !lastName || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.status(200).send('Submit Everything Please')
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
            password
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
              res.status(200).send(' Succesfully Login')
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
    
    const apiKey = 'GYdgrGkmsK1bgin4g0BlKGmwGHA7mlvJoge9b1X1tQma1pbkiyEkRmkwG4N6Q_2vu5hT7YYcHtO9Ul_WCMYicZFn-bvy6A3w3DO2PYUhJkB4QFDOXh3xujH6PGoNXXYx';

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
    const { restaurant, title, text, images, likes, author, comments } = req.body;
    Post.create({restaurant, title, text, images, likes, author, comments})
      .then(() => res.status(201).send('Succesfully posted'))
      .catch(err => res.status(404).send('Error posting',err))
  }
}