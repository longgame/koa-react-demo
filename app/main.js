import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

import './styles/main.scss';

import Counter from './components/Counter';
import TodoList from './components/TodoList';

class App extends React.Component {
  render() {
    return (
      <div id='app'>
        <TodoList />
      </div>
    );
  }
}

var routes = (
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>
);

render(routes, document.getElementById('content'));
