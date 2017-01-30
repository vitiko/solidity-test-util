'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var solidityTestUtil = {

  prepareValue: function prepareValue(value) {
    return value && value.toNumber != undefined ? value.toNumber().toString() : value;
  },

  prepareArray: function prepareArray(arr) {
    return arr.map(function (value) {
      return solidityTestUtil.prepareValue(value);
    });
  },

  prepareObject: function prepareObject(obj) {
    return Object.keys(obj).reduce(function (preparedObj, key) {
      return Object.assign(preparedObj, _defineProperty({}, key, solidityTestUtil.prepareValue(obj[key])));
    }, {});
  },

  getEventLog: function getEventLog(eventListener) {
    return new Promise(function (resolve, reject) {
      return eventListener.get(function (error, log) {
        return error ? reject(error) : resolve(log);
      });
    });
  },

  assertJump: function assertJump(error) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    assert.isAbove(error.message.search('invalid JUMP'), -1, message + ': invalid JUMP error must be returned');
  },

  assertThrow: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(callback) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return callback();

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](0);

              error = _context.t0;

            case 8:

              if (error) solidityTestUtil.assertJump(error, message);else assert.notEqual(error, undefined, 'Error need to be thrown: ' + message);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 5]]);
    }));

    return function assertThrow(_x2) {
      return _ref.apply(this, arguments);
    };
  }()
};

module.exports = solidityTestUtil;