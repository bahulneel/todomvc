// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var attach;

  attach = function(frame, delay) {
    frame.__node[0].frame = frame;
    if (delay === 'delay') {
      frame.__delay = true;
    }
    return frame;
  };

  module.exports = attach;

}).call(this);
