'use strict;'

import Reflux from 'reflux';

import Promise from 'promise';
import Superagent from 'superagent';
import SuperagentPromise from 'superagent-promise';
var request = SuperagentPromise(Superagent, Promise);

var UserActions = Reflux.createActions({
  'refreshUser': {},
  'loginUser': { children: ['completed', 'failed'] },
  'registerUser': { children: ['completed', 'failed'] },
  'logoutUser': {},
  'updateProfile': {},
  'changePassword': {},
});

UserActions.loginUser.listen(function(params) {
  request.post('/login')
    .send({
      email: params.email,
      password: params.password,
    })
    .then(this.completed)
    .catch(this.failed);
});

UserActions.registerUser.listen(function(params) {
  request.post('/register')
    .send({
      email: params.email,
      password: params.password,
    })
    .then(this.completed)
    .catch(this.failed);
});

module.exports = UserActions;
