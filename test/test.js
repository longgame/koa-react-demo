'use strict;'

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('tests', function() {
  it ('assert equal', function() {
    assert.equal(10,10);
  });
  
  it ('assert not equal', function() {
    assert.notEqual(12,16);
  });

  it ('expect to equal', function () {
    expect(10).to.equal(10);
  });

  it ('expect to not equal', function () {
    expect(12).to.not.equal(16);
  });
});
