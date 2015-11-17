'use strict;'

var passport = require('koa-passport'),
    bcrypt = require('bcrypt');

module.exports = function(app) {
  var User = app.models['user'];

  passport.serializeUser = function(user, done) {
    done(null, user.id);
  };

  passport.deserializeUser = function(id, done) {
    co(function *() {
      var user = yield User.findOne({
        where: { id: id }
      });
    }).then(function(user) {
      done(null, user);
    });
  };

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, function(email, password, done) {
    var user;

    co(function *() {
      var user = yield User.findOne({
        where: { email: email }
      });

      if (bcrypt.compareSync(password, user.password)) {
        return user
      } else {
        debug('Invalid password');
        return false;
      };
    }).then(function(user) {
      done(null, user);
    });
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  return passport;
};
