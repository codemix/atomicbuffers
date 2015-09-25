// mmap test
var assert = require('assert');
var fs = require('fs');
var os = require('os');
var atomic = require('../');

describe('atomic-writes.js', function() {
  it('should write an integer to a buffer', function () {
    var buf = new Buffer(16).fill(0);
    var result = atomic.writeInt(buf, 12300, 0);
    console.log(result, buf.readUInt32LE(0), buf);
  });
});
