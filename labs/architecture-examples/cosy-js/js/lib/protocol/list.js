// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var defProtocol, dispatch, extend, isArr, proto, _ref;

  _ref = require('../core/protocol'), defProtocol = _ref.defProtocol, dispatch = _ref.dispatch, extend = _ref.extend;

  isArr = require('../core/native/array').isArr;

  module.exports = proto = defProtocol({
    first: dispatch(function(list) {}),
    second: function(list) {
      return proto.first(proto.rest(list));
    },
    rest: dispatch(function(list) {}),
    conj: dispatch(function(list, item) {}),
    cons: function(item, list) {
      return proto.conj(list, item);
    },
    into: function(to, from) {
      if (from !== null) {
        return proto.into(proto.conj(to, proto.first(from)), proto.rest(from));
      } else {
        return to;
      }
    }
  });

  extend(proto, (function(list) {
    return list === null;
  }), {
    first: function() {
      return null;
    },
    rest: function() {
      return null;
    },
    conj: function(list, item) {
      return [item];
    }
  });

  extend(proto, isArr, {
    first: function(list) {
      if ((list.length != null) && list.length) {
        return list[0];
      } else {
        return null;
      }
    },
    rest: function(list) {
      if (list.length > 1) {
        return list.slice(1);
      } else {
        return null;
      }
    },
    conj: function(list, item) {
      var newList;
      newList = list.slice(0);
      newList.push(item);
      return newList;
    }
  });

}).call(this);
