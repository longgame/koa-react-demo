'use strict;'

var Router = require('koa-router');

var router = Router();

router.get('/', function *() {
  this.body = 'Hello Koa!';
});

module.exports = router;
