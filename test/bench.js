'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function benchmark(name, limit) {
  for (var _len = arguments.length, fns = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    fns[_key - 2] = arguments[_key];
  }

  if (typeof limit === 'function') {
    fns.unshift(limit);
    limit = 1000;
  }
  it('benchmark: ' + name, benchmarkRunner(name, limit, flattenBenchmarkFunctions(fns)));
};

benchmark.skip = function skipBenchmark(name) {
  it.skip('benchmark: ' + name);
};

benchmark.only = function benchmark(name, limit) {
  for (var _len2 = arguments.length, fns = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    fns[_key2 - 2] = arguments[_key2];
  }

  if (typeof limit !== 'number') {
    fns.unshift(limit);
    limit = 1000;
  }
  it.only('benchmark: ' + name, benchmarkRunner(name, limit, flattenBenchmarkFunctions(fns)));
};

function benchmarkRunner(name, limit, fns) {

  return function () {
    this.timeout(10000);
    console.log('\tStarting benchmark: ' + name + '\n');
    var fastest = {
      name: null,
      score: null
    };
    var slowest = {
      name: null,
      score: null
    };
    fns.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var name = _ref2[0];
      var fn = _ref2[1];

      var start = process.hrtime();
      for (var j = 0; j < limit; j++) {
        fn(j, limit);
      }

      var _process$hrtime = process.hrtime(start);

      var _process$hrtime2 = _slicedToArray(_process$hrtime, 2);

      var seconds = _process$hrtime2[0];
      var ns = _process$hrtime2[1];

      seconds += ns / 1000000000;
      var perSecond = Math.round(limit / seconds);
      if (fastest.score === null || fastest.score < perSecond) {
        fastest.name = name;
        fastest.score = perSecond;
      }
      if (slowest.score === null || slowest.score > perSecond) {
        slowest.name = name;
        slowest.score = perSecond;
      }
      console.log('\t' + name + ' benchmark done in ' + seconds.toFixed(4) + ' seconds, ' + perSecond + ' iterations per second.');
    });
    if (fns.length > 1) {
      var diff = (fastest.score - slowest.score) / slowest.score * 100;
      console.log('\n\t' + fastest.name + ' was ' + diff.toFixed(2) + '% faster than ' + slowest.name);
    }
  };
}

function flattenBenchmarkFunctions(fns) {
  return fns.reduce(function (flat, item, index) {
    if (typeof item === "object") {
      flat.push.apply(flat, _toConsumableArray(Object.keys(item).map(function (name) {
        return [name, item[name]];
      })));
    } else {
      flat.push([item.name || "fn" + index, item]);
    }
    return flat;
  }, []);
}
module.exports = benchmark;