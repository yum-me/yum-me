const router = require('express').Router();
const controller = require('./controller');

router.route('/browse')
  .get(controller.findRecent);

router.route('/search')
  .get(controller.search);


router
    .post('/register', controller.register)
    .post('/writepost',controller.writepost)
    .get('/login', controller.login)
    .get('/yelp', controller.restaurant)

    module.exports = router;