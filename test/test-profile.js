'use strict;'

var helpers = require('./helpers'),
    request = helpers.request,
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('co-mocha');

describe('/profile', function() {
  beforeEach(function *() {
    yield helpers.database.sync({force: true});
    yield helpers.registerTestUser();
    yield helpers.loginTestUser();
  });

  it ('GET shows the user profile', function *() {
    var res = yield request.get('/profile/self')
                .expect(200)
                .end();
  });

  it ('helpers.profile shows the user profile', function *() {
    var res = yield helpers.profile();
    var auth = yield helpers.isAuthenticated();
    assert(auth);
  });
});
