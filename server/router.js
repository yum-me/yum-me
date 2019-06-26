const router = require('express').Router();
const controller = require('./controller.js');

router.route('/browse')
  .get(controller.findRecent);

router.route('/search')
  .get(controller.search);


router
  .post('/register', controller.register)
  .post('/writepost',controller.writepost)
  .get('/login', controller.login)
  .get('/yelp', controller.restaurant)


//Matt's routes
router.route('/post')
  .get(controller.getPost)

router.route('/post/like')
  .post(controller.upvote)

router.route('/post/unlike')
  .post(controller.downvote)
  
router.route('/userPosts')
  .get(controller.getUserPosts)

router.route('/feed')
  .get(controller.getFeed)

router.route('/user')
  .get(controller.getUser)

router.route('/user/follow')
  .get(controller.checkFollow)
  .post(controller.followUser)

router.route('/user/unfollow') 
  .post(controller.unfollowUser)

router.route('/comment')
  .post(controller.addComment)


  module.exports = router;