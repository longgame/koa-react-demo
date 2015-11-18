'use strict;'

var app = require('../server'),
    request = require('co-supertest').agent(app.listen()),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('co-mocha');

describe('Index', function() {
  it('GET / renders a page', function *() {
    var res = yield request.get('/')
                      .expect(200)
                      .end();
  });
});
