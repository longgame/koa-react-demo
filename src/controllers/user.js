'use strict;'

var _ = require('lodash'),
    bcrypt = require('bcrypt');
    passport = require('koa-passport');

module.exports = function(Models) {
  var User = Models.user;

  return {
    registerStep1: function *() {
      yield this.render('registration.jade');
    },

    registerStep2: function *() {
      var params = this.request.body;

      try {
        var user = yield User.create({
          email: params['email'],
          password: bcrypt.hashSync(params['password'], 10),
        });
      } catch(e) {
        this.throw(409);
      }

      user.reload();

      this.req.login(user, function(err) {
        // FIXME: handle error
        this.redirect('/profile/self');
      }.bind(this));
    },

    login: function *() {
      yield passport.authenticate('local', {
        successRedirect: '/profile/self',
        failureRedirect: '/error',
      });
    },

    logout: function *() {
      this.logout();
      this.redirect('/success');
    },

    show: function *() {
      // FIXME
    },

    profile: function *() {
      this.body = this.req.user.profile();
    },

    update: function *() {
      // FIXME
    },

    update_email: function *() {
      // FIXME
    },

    update_password: function *() {
      // FIXME
    },
  };
};
