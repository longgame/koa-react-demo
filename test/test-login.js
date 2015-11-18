'use strict;'

var helpers = require('./helpers'),
    request = helpers.request,
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('co-mocha');

describe('Login', function() {
  beforeEach(function *() {
    yield helpers.database.sync({force: true});
    yield helpers.registerTestUser();
  });
  
  it ('POST /login authenticates user', function *() {
    return yield request.post('/login')
                .send(helpers.test_user)
                .expect(302)
                .end();
    expect(res.headers.location).to.equal('/profile/self');
  });

  it ('helpers.loginTestUser authenticates as test_user', function *() {
    var res = yield helpers.loginTestUser()
    expect(res.status).to.equal(302);
    expect(res.headers.location).to.equal('/profile/self');
  });

  /*
  it ('POST redirects unregistered account', function *() {
    var creds = helpers.test_user;
    creds.email = 'user@example.com';

    var res = yield helpers.login(creds)
    expect(res.status).to.equal(302);
    expect(res.headers.location).to.equal('/register');
  });
  */

  it ('blocks invalid password', function *() {
    var creds = helpers.test_user;
    creds.password = 'invalid';

    // FIXME: This should throw a 404
    var res = yield helpers.login(creds)
    expect(res.status).to.equal(302);
    expect(res.headers.location).to.equal('/error');
  });

  /*
  it ('fails gracefully if password is missing', function *() {
    var res = yield helpers.login({ email: 'test@example.com' })
    expect(res.status).to.equal(400);
    expect(res.headers.location).to.equal('/error');
  });

  it ('fails gracefully if email is missing', function *() {
    var res = yield helpers.login({ password: 'Test123!' })
    expect(res.status).to.equal(400);
    expect(res.headers.location).to.equal('/error');
  });
  */
});

describe('Logout', function() {
  before(function *() {
    yield helpers.database.sync({force: true});
    yield helpers.registerTestUser();
  });

  beforeEach(function *() {
    yield helpers.loginTestUser();
  });

  it ('authenticates as test_user before testing', function *() {
    assert(yield helpers.isAuthenticated());
  });

  it ('POST /logout logs the current user out', function *() {
    var res = yield request.post('/logout')
                    .expect(302)
                    .end();
    expect(res.headers.location).to.equal('/success');    // FIXME
  })

  it ('helpers.logout logs the current user out', function *() {
    yield helpers.logout();
    var auth = yield helpers.isAuthenticated();
    assert(!auth);
  })
});
