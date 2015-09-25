"use strict";

// mmap test
var assert = require('assert');
var fs = require('fs');
var os = require('os');
var benchmark = require("./bench");
var atomic = require('../');






describe('atomic-writes.js', function() {

  describe('writeInt32', function () {
    var buf = new Buffer(16).fill(0);
    it('should write 1', function () {
      atomic.writeInt32(buf, 1, 0);
      assert(buf.readInt32LE(0) === 1);
    });
    it('should write 0', function () {
      atomic.writeInt32(buf, 0, 0);
      assert(buf.readInt32LE(0) === 0);
    });
    it('should write ' + (Math.pow(2, 31) - 1), function () {
      atomic.writeInt32(buf, Math.pow(2, 31) - 1, 0);
      assert.equal(buf.readInt32LE(0), Math.pow(2, 31) - 1);
    });
    it('should write ' + Math.pow(2, 31), function () {
      atomic.writeInt32(buf, Math.pow(2, 31), 0);
      assert.equal(buf.readInt32LE(0), - Math.pow(2, 31)); // overflows
    });
  });

  describe('writeUInt32', function () {
    var buf = new Buffer(16).fill(0);
    it('should write 1', function () {
      atomic.writeUInt32(buf, 1, 0);
      assert(buf.readUInt32LE(0) === 1);
    });
    it('should write 0', function () {
      atomic.writeUInt32(buf, 0, 0);
      assert(buf.readUInt32LE(0) === 0);
    });
    it('should write ' + Math.pow(2, 31), function () {
      atomic.writeUInt32(buf, Math.pow(2, 31), 0);
      assert.equal(buf.readUInt32LE(0), Math.pow(2, 31));
    });
    it('should write ' + (Math.pow(2, 32) - 1), function () {
      atomic.writeUInt32(buf, Math.pow(2, 32) - 1, 0);
      assert.equal(buf.readUInt32LE(0), Math.pow(2, 32) - 1);
    });
    it('should write ' + Math.pow(2, 32), function () {
      atomic.writeUInt32(buf, Math.pow(2, 32), 0);
      assert.equal(buf.readUInt32LE(0), 0); // overflows
    });
  });

  describe('readInt32', function () {
    var buf = new Buffer(16).fill(0);

    it('should read 1', function () {
      buf.writeInt32LE(1, 0);
      assert.equal(atomic.readInt32(buf, 0), 1);
    });

    it('should read 0', function () {
      buf.writeInt32LE(0, 0);
      assert.equal(atomic.readInt32(buf, 0), 0);
    });

    it('should read ' + (Math.pow(2, 31) - 1), function () {
      buf.writeInt32LE(Math.pow(2, 31) - 1, 0);
      assert.equal(atomic.readInt32(buf, 0), Math.pow(2, 31) - 1);
    });

    it('should read ' + (Math.pow(2, 31)), function () {
      buf.writeInt32LE(Math.pow(2, 31), 0, true);
      assert.equal(atomic.readInt32(buf, 0), - Math.pow(2, 31));
    });
  });

  describe('readUInt32', function () {
    var buf = new Buffer(16).fill(0);

    it('should read 1', function () {
      buf.writeUInt32LE(1, 0);
      assert.equal(atomic.readUInt32(buf, 0), 1);
    });

    it('should read 0', function () {
      buf.writeUInt32LE(0, 0);
      assert.equal(atomic.readUInt32(buf, 0), 0);
    });

    it('should read ' + (Math.pow(2, 31)), function () {
      buf.writeUInt32LE(Math.pow(2, 31), 0);
      assert.equal(atomic.readUInt32(buf, 0), Math.pow(2, 31));
    });

    it('should read ' + (Math.pow(2, 32) - 1), function () {
      buf.writeUInt32LE(Math.pow(2, 32) - 1, 0);
      assert.equal(atomic.readUInt32(buf, 0), Math.pow(2, 32) - 1);
    });

    it('should read ' + (Math.pow(2, 32)), function () {
      buf.writeUInt32LE(Math.pow(2, 32), 0, true);
      assert.equal(atomic.readUInt32(buf, 0), 0); // overflow
    });
  });

  it('should write an integer to a buffer', function () {
    var buf = new Buffer(16).fill(0);
    var result = atomic.writeInt32(buf, 12300, 0);
    console.log(result, buf.readUInt32LE(0), buf);
  });
});

describe('Benchmarks', function () {
  var buf = new Buffer(16).fill(0);
  buf.writeInt32LE(123, 0);
  buf.writeUInt32LE(456, 4);

  benchmark("readInt32", 1000000, {
    Native: function () {
      return atomic.readInt32(buf, 0);
    },
    Node: function () {
      return buf.readInt32LE(0);
    }
  });

  benchmark("readUInt32", 1000000, {
    Native: function () {
      return atomic.readUInt32(buf, 4);
    },
    Node: function () {
      return buf.readUInt32LE(4);
    }
  });

  benchmark("writeInt32", 1000000, {
    Native: function () {
      return atomic.writeInt32(buf, 4096, 0);
    },
    Node: function () {
      return buf.writeInt32LE(4096, 0);
    }
  });

  benchmark("writeUInt32", 1000000, {
    Native: function () {
      return atomic.writeUInt32(buf, 4096, 0);
    },
    Node: function () {
      return buf.writeUInt32LE(4096, 0);
    }
  });
});

