/* eslint-disable no-eval */

if (process.browser) {
  module.exports = require('./es5/index')
} else {
  var isES5 = false

  try {
    eval('(function*(){})')
  } catch (e) {
    isES5 = true
  }

  module.exports = isES5 ? require('./es5/index') : require('./es6/index')
}
