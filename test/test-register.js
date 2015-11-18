'use strict;'

var helpers = require('./helpers'),
    request = helpers.request,
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('co-mocha');

describe('Registration', function() {
  beforeEach(function *() {
    yield helpers.database.sync({force: true});
  });

  it ('GET /register renders a form', function *() {
    var res = yield request.get('/register')
                .expect(200)
                .end();
  });

  it ('POST /register creates a new user', function *() {
    var res = yield request.post('/register')
                .send(helpers.test_user)
                .expect(302)
                .end();
    expect(res.headers.location).to.equal('/profile/self');
  });

  it ('helpers.register creates a new test_user', function *() {
    var res = yield helpers.register(helpers.test_user);
    expect(res.status).to.equal(302);
    expect(res.headers.location).to.equal('/profile/self');
  });

  it ("Won't register two accounts with the same email", function *() {
    yield helpers.register(helpers.test_user);
    var res = yield helpers.register(helpers.test_user);
    expect(res.status).to.equal(409);
  });
});
