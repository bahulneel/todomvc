// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var assoc, control, core, cosy, evaluator, hashMap, reader, ref, up,
    __hasProp = {}.hasOwnProperty;

  evaluator = require('./core/evaluator');

  reader = require('./core/reader');

  ref = require('./core/reference').ref;

  hashMap = require('./core/hashMap').hashMap;

  assoc = require('./protocol/map').assoc;

  core = require('./snuggle/core');

  cosy = require('./snuggle/cosy');

  control = require('./snuggle/control');

  up = function(startNode, controls, lib, debug) {
    var frame, name, value;
    if (debug == null) {
      debug = false;
    }
    frame = evaluator.frame();
    for (name in lib) {
      if (!__hasProp.call(lib, name)) continue;
      value = lib[name];
      if (core[name] != null) {
        throw new Error("Cannot overwrite " + name + " in core");
      }
      core[name] = value;
    }
    frame = assoc(frame, 'namespace', core);
    frame = assoc(frame, 'cosy', control);
    frame = evaluator.use(frame, cosy);
    frame = evaluator.use(frame, controls);
    frame = assoc(frame, 'global', ref({}));
    frame = assoc(frame, 'debug', debug);
    return up.to(startNode, frame);
  };

  up.to = function(startNode, frame) {
    var attributes, name, obj, selector;
    attributes = [];
    for (name in cosy) {
      if (!__hasProp.call(cosy, name)) continue;
      obj = cosy[name];
      attributes.push("[data-cosy-" + name + "]");
    }
    selector = attributes.join(',');
    frame.__selector = selector;
    return startNode.each(function(index, element) {
      var ast;
      ast = reader.read($(element), selector);
      return evaluator.apply(ast, frame);
    });
  };

  module.exports = {
    up: up
  };

}).call(this);
