'use strict;'

var _ = require('underscore'),
    Reflux = require('reflux');

var TodoActions = require('../actions/TodoActions');

var todoCounter = 0,
    localStorageKey = 'todos';

function getItemByKey(list, key) {
  return _.find(list, function(item) {
    return item.key == key;
  });
};

var TodoStore = Reflux.createStore({
  listenables: [TodoActions],
  init: function() {
    var loadedList = localStorage.getItem(localStorageKey);
    if (!loadedList) {
      // No list is in localStorage.  Create a new one.
      this.list = [{
        key: todoCounter++,
        created: new Date(),
        isComplete: false,
        label: 'Rule the web',
      }];
    } else {
      this.list = _.map(JSON.parse(loadedList), function(item) {
        item.key = todoCounter++;
        return item;
      });
    }
    return this.list;
  },
  // Update the list in localStorage and trigger listening components
  updateList: function(list) {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
    this.list = list;
    this.trigger(list);
  },
  onEditItem: function(itemKey, newLabel) {
    var item = getItemByKey(this.list, itemKey);
    if (!item) return;
    item.label = newLabel;
    this.updateList(this.list);
  },
  onAddItem: function(label) {
    this.updateList([{
      key: todoCounter++,
      created: new Date(),
      isComplete: false,
      label: label,
    }].concat(this.list));
  },
  onRemoveItem: function(itemKey) {
    this.updateList(_.filter(this.list, function(item) {
      return item.key !== itemKey;
    }));
  },
  onToggleItem: function(itemKey) {
    var item = getItemByKey(this.list, itemKey);
    if (item) {
      item.isComplete = !item.isComplete;
      this.updateList(this.list);
    }
  },
  onToggleAllItems: function(checked) {
    this.updateList(_.map(this.list, function(item) {
      item.isComplete = checked;
      return item;
    }));
  },
  onClearCompleted: function() {
    this.updateList(_.filter(this.list, function(item) {
      return item.isComplete !== true;
    }));
  },
});

module.exports = TodoStore;
