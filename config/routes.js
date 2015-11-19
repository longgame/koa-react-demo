'use strict;'

var Router = require('koa-router'),
    koaBody = require('koa-body');

var bodyParser = koaBody();

var requireAuth = function *(next) {
  if (this.req.isAuthenticated()) {
    yield next;
  } else {
    this.flash('error', 'You must log in to do that');
    this.throw(401);
  }
};

module.exports = function(assets) {
  var router = new Router();

  router.use(function *(next) {
    try {
      yield next;
    } catch(e) {
      this.status = e.status || 500;
      this.body = this.flash('error') || e.message;
      this.app.emit('error', e, this);
    };
  });

  router.get('/', function *() {
    yield this.render('index.jade');
  });

  router.all('/success', function *() {
    this.body = 'Success!';
  });

  router.all('/error', function *() {
    this.body = 'Error';
  });

  var _register = new Router({
    prefix: '/register'
  });

  _register.get('/', assets.user.registerStep1);
  _register.post('/', bodyParser, assets.user.registerStep2);

  router.use(_register.routes());

  var _login = new Router({
    prefix: '/login'
  });

  _login.get('/', function *() {
    yield this.render('login.jade');
  });
  _login.post('/', bodyParser, assets.user.login);

  router.use(_login.routes());

  router.all('/logout', assets.user.logout);

  var _profile = new Router({
    prefix: '/profile'
  });

  _profile.get('/self', requireAuth, assets.user.profile);

  router.use(_profile.routes());

  return router;
};
