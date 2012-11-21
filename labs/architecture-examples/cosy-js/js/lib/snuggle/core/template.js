// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var evaluator, hogan, html, reader, render, renderRaw, renderTemplate, template;

  render = require('../../protocol/template').render;

  hogan = require('../../template/hogan');

  evaluator = require('../../core/evaluator');

  reader = require('../../core/reader');

  html = require('./html');

  template = function(id, element) {
    var partial, partialName, tmpl, _ref;
    if (id == null) {
      id = 'template';
    }
    if (element == null) {
      element = this.element;
    }
    tmpl = (element.find("script[data-id=" + id + "]")).eq(0);
    if ('text/mustache' === tmpl.attr('type')) {
      partialName = tmpl.data('partial');
      if (partialName) {
        partial = (_ref = this.frame.partials) != null ? _ref[partialName] : void 0;
        if (partial == null) {
          throw new Error("Partial not found " + partialName);
        }
        return hogan.tmpl(partial);
      } else {
        return hogan.tmpl(tmpl.html());
      }
    } else {
      throw new Error("Unkown type for template " + id);
    }
  };

  renderTemplate = function(tmpl, context) {
    var ast, element, tags;
    html = render(tmpl, context);
    tags = /^<.+>$/i.test($.trim(html.replace(/[\r\n]/gm, " ")));
    if (tags) {
      element = $(html);
    } else {
      element = this.html.span({}, html);
    }
    ast = reader.read(element, this.frame.__selector);
    evaluator.apply(ast, this.frame);
    return element;
  };

  renderRaw = function(tmpl, context) {
    return render(tmpl, context);
  };

  module.exports = {
    template: template,
    render: renderTemplate,
    renderRaw: renderRaw
  };

}).call(this);
