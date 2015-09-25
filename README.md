# Atomic Buffers

Atomic `readInt32()`, `writeInt32()`, `readUInt32()` and `writeUInt32()` for node.js buffers.

> Status: **Experimental**

[![Build Status](https://travis-ci.org/codemix/atomicbuffers.svg)](https://travis-ci.org/codemix/atomicbuffers)

## Installation

Via [npm](https://www.npmjs.com/package/atomicbuffers):
```sh
npm install --save atomicbuffers
```

## Usage

```js
var atomic = require("atomicbuffers");

var buf = new Buffer(16);

atomic.writeInt32(buf, 123, 0);
atomic.readInt32(buf, 0); // 123
```

## Benchmarks
JavaScript is faster than C++ ;)
```
  Starting benchmark: readInt32

  Native benchmark done in 0.0786 seconds, 12717938 iterations per second.
  Node benchmark done in 0.0137 seconds, 73123891 iterations per second.

  Node was 474.97% faster than Native
    ✓ benchmark: readInt32 (93ms)
  Starting benchmark: readUInt32

  Native benchmark done in 0.0788 seconds, 12684125 iterations per second.
  Node benchmark done in 0.0155 seconds, 64487322 iterations per second.

  Node was 408.41% faster than Native
    ✓ benchmark: readUInt32 (94ms)
  Starting benchmark: writeInt32

  Native benchmark done in 0.0820 seconds, 12196550 iterations per second.
  Node benchmark done in 0.0146 seconds, 68397170 iterations per second.

  Node was 460.79% faster than Native
    ✓ benchmark: writeInt32 (97ms)
  Starting benchmark: writeUInt32

  Native benchmark done in 0.0823 seconds, 12150923 iterations per second.
  Node benchmark done in 0.0154 seconds, 64977655 iterations per second.

  Node was 434.75% faster than Native
    ✓ benchmark: writeUInt32 (98ms)

```


# License

Published by [codemix](http://codemix.com/) under a permissive MIT License, see [LICENSE.md](./LICENSE.md).
