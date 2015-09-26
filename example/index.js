"use strict";

var mmap = require("mmap.js");
var fs = require("fs");
var atomic = require('../lib/atomicbuffers.js');
var cluster = require("cluster");

var FILENAME = __dirname + '/test.txt';

function create (filename, cb) {
  fs.appendFile(filename, new Buffer(1024).fill(0), cb);
}

function load (filename, cb) {
  fs.open(filename, 'r+', function (err, fd) {
    if (err) return cb(err);
    fs.fstat(fd, function (err, stat) {
      if (err) return cb(err);
      var buffer = mmap.alloc(
        stat.size,
        mmap.PROT_READ | mmap.PROT_WRITE,
        mmap.MAP_SHARED,
        fd,
        0
      );
      fs.close(fd, function (err) {
        if (err) return cb(err);
        cb(null, buffer);
      })
    });
  });
}



function runMaster () {
  var counter = Math.pow(2, 32) - 1;
  create(FILENAME, function (err) {
    if (err) throw err;
    load(FILENAME, function (err, buffer) {
      if (err) throw err;
      function write () {
        atomic.writeUInt32(buffer, counter--, 0);
        setImmediate(write);
      }
      atomic.writeUInt32(buffer, counter, 0);

      var limit = 8;
      for (let i = 0; i < limit; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log('worker ' + worker.process.pid + ' died');
      });

      setTimeout(write, 1000);
    });
  });
}

function runWorker () {
  var last = null;
  var counter = 0;
  load(FILENAME, function (err, buffer) {
    if (err) throw err;
    function read () {
      var value = atomic.readUInt32(buffer, 0);
      if (last !== null && last < value) {
        console.log("Worker " + process.pid + " read invalid value: " + value + ", expected " + last);
      }
      last = value;
      counter++;
      if (counter % 1000000 === 0) {
        console.log("Worker " + process.pid + " has read " + counter + " values, last was " + last);
      }
      setImmediate(read);
    }

    read();
  });

}


if (cluster.isMaster) {
  runMaster();
}
else {
  runWorker();
}