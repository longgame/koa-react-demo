'use strict;'

var koa = require('koa'),
    debug = require('debug');

var config = require('./config/config'),
    router = require('./config/routes'),
    models = require('./src/models');

var app = module.exports = koa();

app.use(router.routes());

if (!module.parent) {
  app.listen(config.app.port);
  console.log('Listening on %s:%s',
    config.app.host,
    config.app.port);
}
