'use strict;'

var _ = require('lodash'),
    path = require('path');

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

// App
var koa = require('koa');
var app = koa();
module.exports = app;
module.exports.database = models.sequelize;

// Sessions
var session = require('koa-generic-session');
app.keys = ['session-secret'];                      // FIXME
app.use(session());

var flash = require('koa-connect-flash');
app.use(flash());

// Authentication
var passport = require('./config/passport')(models['user']);
app.use(passport.initialize());
app.use(passport.session());

// Static content
var serve = require('koa-static');
app.use(serve('./public'));
app.use(serve('./dist'));

// Routes and views
app.use(views);
app.use(router.routes());


// Middleware
app.use(function *(next) {
  try {
    yield next;
  } catch(e) {
    debug('ERROR ' + e.message);
  };
});

app.use(function *(next) {
  var start = new Date;
  yield next;
  var end = new Date;

  console.log('[%s] %s %s - %s ms',
    this.status,
    this.method,
    this.url,
    (end-start));
});

// Start the server
if (!module.parent) {
  app.listen(settings.app.port);
  console.log('Listening on %s:%s',
    settings.app.host,
    settings.app.port);
}
