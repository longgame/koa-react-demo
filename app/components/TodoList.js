'use strict;'

var _ = require('underscore'),
    React = require('react'),
    Reflux = require('reflux');

var TodoStore = require('../stores/TodoStore'),
    TodoActions = require('../actions/TodoActions');

var checkboxBlank = require('../assets/checkbox-blank.png'),
    checkboxMarked = require('../assets/checkbox-marked.png');

var TodoInput = React.createClass({
  handleValueChange: function(evt) {
    var text = evt.target.value;
    if (evt.which === 13 && text) {   // Enter
      TodoActions.addItem(text);
      evt.target.value = '';
    } else if (evt.which == 27) {     // Escape
      evt.target.value = '';
    }
  },
  handleToggle: function(evt) {
    console.log(evt.target);
    TodoActions.toggleAllItems();
  },
  render: function() {
    return (
      <li>
        <div className='todo-input'>
          <input
            className='toggle-all'
            type='checkbox'
            checked={!!this.props.isComplete} />
          <label onClick={this.handleToggle}></label>
          <input placeholder='Todos' onKeyUp={this.handleValueChange} />
        </div>
      </li>
    );
  },
});

var TodoItem = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleToggle: function(evt) {
    TodoActions.toggleItem(this.props.id);
  },
  handleDestroy: function() {
    TodoActions.removeItem(this.props.id);
  },
  render: function() {
    return (
      <li>
        <div className='todo-item'>
          <input
            className='toggle'
            type='checkbox'
            checked={!!this.props.isComplete} />
          <label onClick={this.handleToggle}>{this.props.label}</label>
        </div>
      </li>
    );
  },
});

var TodoList = React.createClass({
  mixins: [Reflux.connect(TodoStore, 'list')],
  getInitialState: function() {
    return {
      list: TodoStore.list,
    };
  },
  render: function() {
    var list = this.state.list;
    return (
      <div className='todo-list'>
        <header id='header'>
        </header>
        <ul id='todo-list'>
          <TodoInput />
          { list.map(function(item) {
            return <TodoItem
                      label={item.label}
                      isComplete={item.isComplete}
                      id={item.key}
                      key={item.key} />;
          })}
        </ul>
        <footer id='footer'>
          <button id='clear-completed' onClick={TodoActions.clearCompleted}>Clear Tasks</button>
        </footer>
      </div>
    );
  },
});

module.exports = TodoList;
