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
        this.redirect('/profile/self');
      }.bind(this));
    },

    login: function *() {
      var ctx = this;
      yield passport.authenticate('local', function *(err, user, info) {
        if (err) throw(err);

        if (!user) {
          ctx.flash('error', 'Invalid username or password');
          ctx.throw(401);
        } else {
          yield ctx.login(user);
          ctx.redirect('/profile/self');
        }
      }).call(this);
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
