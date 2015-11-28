import React from 'react';
import { render } from 'react-dom';
//import { Router, Route, Link } from 'react-router';

import './styles/main.scss';

import Counter from './components/Counter';
import TodoList from './components/TodoList';

class Hello extends React.Component {
  render() {
    return <h1>Hello {this.props.name}!</h1>
  }
}

render(<TodoList />, document.getElementById('content'));
