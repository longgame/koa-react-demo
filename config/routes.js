'use strict;'

var Router = require('koa-router');

var router = Router();

router.get('/', function *() {
  this.render('index');
});

module.exports = router;
