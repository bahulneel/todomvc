// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var List, collection, createRef, instance, isCollection, isRef, mutable, notifyRef, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('../../core/collection'), collection = _ref.collection, isCollection = _ref.isCollection;

  mutable = require('../../protocol/mutable');

  _ref1 = require('../../core/reference'), isRef = _ref1.isRef, createRef = _ref1.ref, notifyRef = _ref1.notifyRef;

  instance = 0;

  List = (function() {

    function List(control, ref, itemTemplate) {
      var data, element, index, item, itemData, items, _base, _i, _len, _ref2, _ref3;
      this.control = control;
      this.itemTemplate = itemTemplate;
      this.renderAll = __bind(this.renderAll, this);

      this.remove = __bind(this.remove, this);

      this.prepend = __bind(this.prepend, this);

      this.append = __bind(this.append, this);

      this.render = __bind(this.render, this);

      this.filter = __bind(this.filter, this);

      if (!isRef(ref)) {
        throw new Error("First argument must be a reference");
      }
      instance += 1;
      this.instance = instance;
      this.ref = ref;
      this.collection = mutable.get(ref);
      if (!isCollection(this.collection)) {
        this.collection = collection(ref);
        mutable.set(ref, this.collection);
      }
      items = this.control.element.children('[data-item]');
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        element = items.eq(index);
        itemData = (element.data('item')) || {};
        data = createRef(itemData);
        if ((_ref2 = (_base = data.metadata).listElements) == null) {
          _base.listElements = {};
        }
        data.metadata.listElements[this.instance] = element;
        this.collection.push(data);
      }
      if ((_ref3 = this.itemTemplate) == null) {
        this.itemTemplate = this.control.template('item');
      }
      this.collection.onAppend(this.append);
      this.collection.onPrepend(this.prepend);
      this.collection.onRemove(this.remove);
      this.collection.onUpdate(this.update);
      this.renderAll();
    }

    List.prototype.filter = function(item) {
      return true;
    };

    List.prototype.render = function(index) {
      var control, item, node, oldNode, _base, _i, _len, _ref2, _ref3,
        _this = this;
      item = this.collection[index];
      if (!this.filter(mutable.get(item))) {
        return;
      }
      this.control.frame.item = item;
      if ((_ref2 = (_base = item.metadata).listElements) == null) {
        _base.listElements = {};
      }
      node = this.control.render(this.itemTemplate, mutable.get(item));
      oldNode = item.metadata.listElements[this.instance];
      item.metadata.listElements[this.instance] = node;
      if (oldNode != null) {
        node.insertAfter(oldNode);
        _ref3 = this.control.children;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          control = _ref3[_i];
          if (oldNode === control.element) {
            control.destroy();
            oldNode = null;
          }
        }
        if (oldNode) {
          oldNode.remove();
        }
      } else {
        this.control.watchRef(item, function() {
          _this.render(index);
          return notifyRef(_this.ref);
        });
      }
      return node;
    };

    List.prototype.append = function(index) {
      var node;
      node = this.render(index);
      if (node != null) {
        return this.control.element.append(node);
      }
    };

    List.prototype.prepend = function(index) {
      var node;
      node = this.render(index);
      if (node != null) {
        return this.control.element.prepend(node);
      }
    };

    List.prototype.remove = function(ref) {
      var control, element, _i, _len, _ref2, _ref3, _ref4;
      if (((_ref2 = ref.metadata) != null ? (_ref3 = _ref2.listElements) != null ? _ref3[this.instance] : void 0 : void 0) == null) {
        return;
      }
      element = ref.metadata.listElements[this.instance];
      delete ref.metadata.listElements[this.instance];
      _ref4 = this.control.children;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        control = _ref4[_i];
        if (element === control.element) {
          control.destroy();
          element = null;
        }
      }
      if (element != null) {
        return element.remove();
      }
    };

    List.prototype.renderAll = function() {
      var index, item, _i, _len, _ref2, _ref3, _ref4, _results;
      this.control.element.html('');
      _ref2 = this.collection;
      _results = [];
      for (index = _i = 0, _len = _ref2.length; _i < _len; index = ++_i) {
        item = _ref2[index];
        if (((_ref3 = item.metadata) != null ? (_ref4 = _ref3.listElements) != null ? _ref4[this.instance] : void 0 : void 0) != null) {
          _results.push(this.control.element.append(item.metadata.listElements[this.instance]));
        } else {
          _results.push(this.append(index));
        }
      }
      return _results;
    };

    return List;

  })();

  module.exports = {
    List: List
  };

}).call(this);
