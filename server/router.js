const router = require('express').Router();
const controller = require('./controller');

router.route('/browse')
  .get(controller.findRecent);

router.route('/search')
  .get(controller.search);


module.exports = router;