'use strict;'

var Router = require('koa-router');

var router = Router();

router.get('/', function *() {
  yield this.render('index.jade');
});

module.exports = router;
