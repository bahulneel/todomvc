// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var Entity, assertFn, assoc, createEntity, defProtocol, dispatch, dissoc, element, entity, extend, get, isEntity, proto, _ref, _ref1,
    __slice = [].slice;

  assertFn = require('../core/native/function').assertFn;

  _ref = require('../core/protocol'), defProtocol = _ref.defProtocol, dispatch = _ref.dispatch, extend = _ref.extend;

  _ref1 = require('../protocol/map'), assoc = _ref1.assoc, dissoc = _ref1.dissoc, get = _ref1.get;

  element = require('../protocol/element');

  proto = require('../protocol/entity');

  Entity = (function() {

    function Entity(name, id, node) {
      this.name = name;
      this.id = id;
      this.node = node;
    }

    return Entity;

  })();

  isEntity = function(type) {
    return type instanceof Entity;
  };

  extend(proto, isEntity, {
    update: function(entity, newValue) {
      return set(entity, newValue);
    },
    remove: function(entity) {
      var node;
      node = entity.node;
      return element.remove(node);
    },
    name: function(entity) {
      return entity.name;
    },
    id: function(entity) {
      return entity.id;
    }
  });

  createEntity = function(frame, name, id, node) {
    return new Entity(name, id, node);
  };

  entity = function(frame, constructor, name, id) {
    assertFn(constructor, 'Invalid constructor ' + constructor);
    return assoc(frame, name, constructor(frame, name, id, get(frame, '__node')));
  };

  module.exports = {
    entity: function() {
      var args, frame;
      frame = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (args.length < 3) {
        args.unshift(createEntity);
      }
      return entity.apply(null, [frame].concat(__slice.call(args)));
    },
    update: function(frame, entity, newValue) {
      proto.update(entity, newValue);
      return frame;
    },
    remove: function(frame, entity) {
      proto.remove(entity);
      return frame;
    }
  };

}).call(this);
