// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var assertArr, isArr;

  isArr = Array.isArray || function(value) {
    return (Object.prototype.toString.call(value)) === '[object Array]';
  };

  assertArr = function(value, message) {
    if (message == null) {
      message = 'Invalid array';
    }
    if (!(isArr(value))) {
      throw new Error(message);
    }
    return value;
  };

  module.exports = {
    isArr: isArr,
    assertArr: assertArr
  };

}).call(this);
