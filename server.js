'use strict;'

var _ = require('lodash'),
    path = require('path'),
    koa = require('koa'),
    Jade = require('koa-jade'),
    serve = require('koa-static');

var models = require('./src/models'),
    controllers = require('./src/controllers')(models),
    views = require('koa-views')(
      path.join(__dirname, 'src/views'), {
        default: 'html',
        map: {
          jade: 'jade',
        },
      }
    );

var settings = require('./config/config'),
    router = require('./config/routes')(controllers);

var debug = require('debug')(settings.app.name);

var app = module.exports = koa();

app.use(views);
app.use(router.routes());

// Authentication
var passport = require('./config/passport')(models['user']);
app.use(passport.initialize());
app.use(passport.session());

// Static files
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
  app.listen(settings.app.port);
  debug('Listening on %s:%s',
    settings.app.host,
    settings.app.port);
}
