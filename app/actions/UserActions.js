'use strict;'

var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'refreshCurrentUser',
  'registerNewUser',
  'loginUser',
  'logoutUser',
  'updateProfile',
  'changePassword',
]);

