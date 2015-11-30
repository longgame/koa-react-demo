'use strict;'

var _ = require('underscore'),
    Reflux = require('reflux');

var UserActions = require('../actions/UserActions');

var localStorageKey = 'current-user';

module.exports = Reflux.createStore({
  listenables: [UserActions],
  init: function() {
    var cached = localStorage.getItem(localStorageKey);
    if (!cached) {
      this.user = {
        status: 'logged-out',
      };
    } else {
      this.user = JSON.parse(cached);
    }
    return this.user;
  },
  onRefreshCurrentUser: function(params) {
  },
  onRegisterNewUser: function(params) {
  },
  onLoginUser: function(params) {
    // FIXME: AJAX post to log in user here
  },
  onLogoutUser: function(params) {
  },
  onUpdateProfile: function(params) {
  },
  onChangePassword: function(params) {
  },
});
