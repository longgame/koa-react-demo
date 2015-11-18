'use strict;'

var passport = require('koa-passport'),
    bcrypt = require('bcrypt'),
    co = require('co');

module.exports = function(User) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    co(function *() {
      var user = yield User.findOne({
        where: { id: id }
      });
      done(null, user);
    });
  });

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, function(email, password, done) {
    co(function *() {
      var user = yield User.findOne({
        where: { email: email }
      });

      if (bcrypt.compareSync(password, user.password)) {
        done(null, user);
      } else {
        // FIXME: Flash message here
        done(null, false);
      };
    });
  }));
  
  return passport;
};
