'use strict;'

var _ = require('underscore'),
    React = require('react'),
    Reflux = require('reflux');

var TodoStore = require('../stores/TodoStore'),
    TodoActions = require('../actions/TodoActions');

var checkboxBlank = require('../assets/checkbox-blank.png'),
    checkboxMarked = require('../assets/checkbox-marked.png');

var NewTodo = React.createClass({
  handleValueChange: function(evt) {
    var text = evt.target.value;
    if (evt.which === 13 && text) {   // Enter
      TodoActions.addItem(text);
      evt.target.value = '';
    } else if (evt.which == 27) {     // Escape
      evt.target.value = '';
    }
  },
  render: function() {
    return (
      <div>
        <h3>Todo List:</h3>
        <input id='new-todo' placeholder='What needs to be done?' onKeyUp={this.handleValueChange} />
      </div>
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
          <input className='toggle' type='checkbox' checked={!!this.props.isComplete} onChange={this.handleToggle} />
          <label onDoubleClick={this.handleToggle}>{this.props.label}</label>
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
  toggleAll: function(evt) {
    TodoActions.toggleAllItems(evt.target.checked);
  },
  render: function() {
    var list = this.state.list;
    return (
      <div className='todo-list'>
        <header id='header'>
          <NewTodo />
        </header>
        <input id='toggle-all' type='checkbox' onChange={this.toggleAll} />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul id='todo-list'>
          { list.map(function(item) {
            return <TodoItem label={item.label} isComplete={item.isComplete} id={item.key} key={item.key} />;
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
