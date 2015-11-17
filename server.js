'use strict;'

var _ = require('lodash'),
    path = require('path'),
    koa = require('koa'),
    Jade = require('koa-jade'),
    serve = require('koa-static');

var config = require('./config/config'),
    router = require('./config/routes'),
    models = require('./src/models'),
    views = require('koa-views')(
      path.join(__dirname, 'src/views'), {
        default: 'html',
        map: {
          jade: 'jade',
        },
      }
    );

var debug = require('debug')(config.app.name);

var app = module.exports = koa();

app.use(views);
app.use(router.routes());

app.use(serve('./public'));
app.use(serve('./dist'));

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
