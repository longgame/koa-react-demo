'use strict;'

var passport = require('passport'),
    bcrypt = require('bcrypt');

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
    user = yeild User.findOne({
      where: { email: email }
    });

    // FIXME: Verify the password here
  }).then(function(user) {
    done(null, user);
  });
}));
