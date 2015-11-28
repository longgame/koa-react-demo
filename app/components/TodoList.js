'use strict;'

var _ = require('underscore'),
    React = require('react'),
    Reflux = require('reflux');

import { LinkedStateMixin } from 'react-addons';
import classNames from 'classnames';

var TodoStore = require('../stores/TodoStore'),
    TodoActions = require('../actions/TodoActions');

var checkbox = require('../assets/check.png'),
    edit = require('../assets/pencil.png'),
    trash = require('../assets/trash.png');

var TodoInput = React.createClass({
  handleValueChange: function(event) {
    var text = event.target.value;
    if (event.which === 13 && text) {   // Enter
      TodoActions.addItem(text);
      event.target.value = '';
    } else if (event.which == 27) {     // Escape
      event.target.value = '';
    }
  },
  handleToggle: function(event) {
    TodoActions.toggleAllItems();
  },
  render: function() {
    return (
      <li>
        <div className='todo-input'>
          <input 
            className='todo-item'
            type='text'
            onKeyUp={this.handleValueChange} />
        </div>
      </li>
    );
  },
});

var TestItem = React.createClass({
  mixins: [ LinkedStateMixin ],
  getInitialState: function() {
    return {
      isEditing: false,
      editValue: 'test',
    };
  },
  handleEdit: function() {
    this.setState({
      isEditing: true,
    });
  },
  handleValueChange: function(event) {
    //var text = event.target.value;
    console.log(event.which);
    if (event.which === 13) {   // Enter
      //TodoActions.addItem(text);
      //event.target.value = '';
      this.setState({
        isEditing: false,
      });
      TodoActions.editItem(
        this.props.id,
        this.state.editValue
      );
    } else if (event.which == 27) {     // Escape
      //event.target.value = '';
    }
  },
  render: function() {
    var classes = classNames('todo-item', {
      'editing': this.state.isEditing,
    });
    return (
      <div className={classes}>
        <input
          className='toggle'
          type='checkbox'
          checked={!!this.props.isComplete}
        />
        <label
          onClick={this.handleEdit}
        >{this.props.label}</label>
        <input
          className='edit'
          valueLink={this.linkState('editValue')}
          onKeyUp={this.handleValueChange}
        />
      </div>
    );
  }
});

var TodoItem = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
    };
  },
  handleToggle: function(event) {
    TodoActions.toggleItem(this.props.id);
  },
  handleDestroy: function() {
    TodoActions.removeItem(this.props.id);
  },
  handleEditStart: function() {
    this.state.editing = true;
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
          <button
            id='edit-items'
            onClick={this.handleEditStart}
          ><img 
            className='edit-item'
            src='/assets/pencil.png'
          /></button>
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
  handleEditStart: function(event) {
  },
  render: function() {
    var list = this.state.list;
    return (
      <div className='todo-list'>
        <header id='todo-header'>
          Todo List
          
          <button id='clear-items'
            onClick={TodoActions.clearCompleted}
          ><img
            className='image'
            src='/assets/trash.png'
          /></button>
          
          <button
            className='edit-items'
            onClick={this.handleEditStart}
          ><img 
            className='image'
            src='/assets/pencil.png'
          /></button>
        </header>
        <ul id='todo-body'>
          <TodoInput />
          { list.map(function(item) {
            return (
              <li>
                <TestItem
                  label={item.label}
                  isComplete={item.isComplete}
                  id={item.key}
                  key={item.key}
                />
              </li>
            );
          })}
        </ul>
        <footer id='todo-footer'>
        </footer>
      </div>
    );
  },
});

module.exports = TodoList;
