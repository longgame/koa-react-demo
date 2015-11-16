'use strict;'

var _ = require('lodash'),
    koa = require('koa'),
    Jade = require('koa-jade'),
    serve = require('koa-static'),
    debug = require('debug')('verbose');

var config = require('./config/config'),
    router = require('./config/routes'),
    models = require('./src/models'),
    views = new Jade({
      viewPath: './src/views',
      helperPath: './src/helpers',
    });

var app = module.exports = koa();

app.use(views.middleware);
app.use(router.routes());

app.use(serve('./dist'));
app.use(serve('./public'));

// Print how long each page load takes
app.use(function *(next) {
  var start = new Date;
  yield next;
  var end = new Date;
  debug('[%s] %s %s - %s ms',
    this.status,
    this.method,
    this.url,
    end-start);
});

if (!module.parent) {
  app.listen(config.app.port);
  debug('Listening on %s:%s',
    config.app.host,
    config.app.port);
}
