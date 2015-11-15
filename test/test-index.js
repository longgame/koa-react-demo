'use strict;'

var app = require('../server'),
    request = require('co-supertest')(app.listen()),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('index', function() {
  before(function *() {
  });

  it('GET / renders a page', function *() {
    var res = yield request.get('/')
                      .expect(200)
                      .end();
  });
});
