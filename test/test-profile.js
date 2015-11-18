'use strict;'

var helpers = require('./helpers'),
    request = helpers.request,
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('co-mocha');

describe('Profile', function() {
  beforeEach(function *() {
    yield helpers.database.sync({force: true});
    yield helpers.registerTestUser();
    yield helpers.loginTestUser();
  });

  it ('GET /profile shows the user profile', function *() {
    var res = yield request.get('/profile/self')
                .expect(200)
                .end();
  });

  it ('helpers.profile shows the user profile', function *() {
    var res = yield helpers.profile();
    expect(res.status).to.equal(200);
  });

  it ('blocks unauthenticated requests', function *() {
    yield helpers.logout();
    var res = yield helpers.profile();
    expect(res.status).to.equal(401);
  });
});
