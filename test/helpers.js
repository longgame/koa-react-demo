'use strict;'

var app = require('../server'),
    request = require('co-supertest').agent(app.listen());

exports.app = app;
exports.database = app.database;
exports.request = request;

exports.test_user = {
  email: 'test@example.com',
  password: 'Test123!'
};

exports.register = function *(user) {
  return yield request.post('/register')
              .send(user)
              .end();
};

exports.registerTestUser = function *() {
  return yield exports.register(exports.test_user);
};

exports.login = function *(user) {
  return yield request.post('/login')
              .send(user)
              .end();
};

exports.loginTestUser = function *() {
  return yield exports.login(exports.test_user);
};

exports.logout = function *() {
  return yield request.post('/logout').end();
};

exports.profile = function *() {
  return yield request.get('/profile/self').end();
};

exports.isAuthenticated = function *() {
  var res = yield exports.profile();
  return (res.status == 200);
};
