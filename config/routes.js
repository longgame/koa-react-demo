'use strict;'

var Router = require('koa-router'),
    bodyParser = require('koa-body')(),
    passport = require('koa-passport');

module.exports = function(assets) {
  var router = new Router();

  router.get('/', function *() {
    yield this.render('index.jade');
  });

  router.all('/success', function *() {
    this.body('Success!');
  });

  router.all('/error', function *() {
    this.body = 'Encountered and error';
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

  _login.post('/', bodyParser, passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/error',
  }));

  router.use(_login.routes());

  var _profile = new Router({
    prefix: '/profile'
  });

  // FIXME

  router.use(_profile.routes());

  return router;
};
