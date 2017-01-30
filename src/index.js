const solidityTestUtil = {

  prepareValue: (value) => value && value.toNumber != undefined ? value.toNumber().toString() : value,

  prepareArray: (arr) => arr.map(value => solidityTestUtil.prepareValue(value)),

  prepareObject: (obj) =>
    Object.keys(obj).reduce(
      (preparedObj, key) => Object.assign(preparedObj, {
        [key]: solidityTestUtil.prepareValue(obj[key])
      }), {}
    ),

  getEventLog: (eventListener) =>
    new Promise(
      (resolve, reject) => eventListener.get(
        (error, log) => error ? reject(error) : resolve(log)
      )),

  assertJump: (error, message = '') => {
    assert.isAbove(error.message.search('invalid JUMP'), -1, message + ': invalid JUMP error must be returned');
  },

  assertThrow: async(callback, message = '') => {
    var error;
    try {
      await callback();
    } catch (err) {
      error = err;
    }

    if (error) solidityTestUtil.assertJump(error, message);
    else  assert.notEqual(error, undefined, 'Error need to be thrown: ' + message);
  }
}

module.exports = solidityTestUtil;