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
  onRefreshUser: function(params) {
  },
  onRegisterUser: function(params) {
    this.trigger('JZA');
  },
  onLoginUser: function(params) {
    this.trigger('RZA');
  },
  onLogoutUser: function(params) {
  },
  onUpdateProfile: function(params) {
  },
  onChangePassword: function(params) {
  },
});
