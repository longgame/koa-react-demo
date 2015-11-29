'use strict;'

var _ = require('underscore'),
    Reflux = require('reflux');

var TodoActions = require('../actions/TodoActions');

var todoCounter = 0,
    localStorageKey = 'todos';

var TodoStore = Reflux.createStore({
  listenables: [TodoActions],
  init: function() {
    var loadedList = localStorage.getItem(localStorageKey);
    var loadedList;
    if (!loadedList) {
      // No list is in localStorage.  Create a new one.
      this.list = [{
        key: todoCounter++,
        created: new Date(),
        isComplete: false,
        label: '<h1>http://longgame.co</h1>',
      }];
    } else {
      this.list = _.map(JSON.parse(loadedList), function(item) {
        item.key = todoCounter++;
        return item;
      });
    }
    return this.list;
  },
  refresh: function() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.list));
    this.trigger(this.list);
  },
  onEditItem: function(itemKey, newLabel) {
    var item = _.findWhere(this.list, { key: itemKey });
    if (item) {
      item.label = newLabel;
      this.refresh();
    }
  },
  onAddItem: function(label) {
    var list = _.flatten([{
      key: todoCounter++,
      created: new Date(),
      isComplete: false,
      label: label,
    }, this.list]);
    this.list = list;
    this.refresh();
    
  },
  onRemoveItem: function(itemKey) {
    var list = _.filter(this.list, function(item) {
      return item.key !== itemKey;
    });
    this.list = list;
    this.refresh();
  },
  onToggleItem: function(itemKey) {
    var item = _.findWhere(this.list, { key: itemKey });
    if (item) {
      item.isComplete = !item.isComplete;
      this.refresh();
    }
  },
  onToggleAllItems: function() {
    var unchecked = _.where(this.list, { isComplete: false });
    console.log(unchecked);
    if (unchecked.length == 0) {
      _.each(this.list, function(item) {
        item.isComplete = false;
      });
    } else {
      for (var j=0; j<unchecked.length; j++) {
        unchecked[j].isComplete = true;
      }
    }
    this.refresh();
  },
  onClearCompleted: function() {
    var incomplete = _.where(this.list, { isComplete: false });
    this.list = incomplete;
    this.refresh();
  },
});

module.exports = TodoStore;
