'use strict;'

var bcrypt = require('bcrypt');

module.exports = function(Models) {
  var User = Models.user;

  return {
    show: function *() {
    },
    update: function *() {
    },
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

      this.body = 'success';
      /*
      this.req.login(user, function(err) {
        this.body = 'success';
      }.bind(this));
      */
    },
    profile: function *() {
    }
  };
};
