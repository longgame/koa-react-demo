import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

import './styles/main.scss';

import Counter from './components/Counter';
import TodoList from './components/TodoList';
import About from './components/About';
import Navbar from './components/Navbar';
import { LoginForm, RegistrationForm } from './components/Forms';

class App extends React.Component {
  render() {
    return (
      <div id='app'>
        <div id='app-header'>
          <Navbar />
        </div>
        <div id='app-body'>
          { this.props.children }
        </div>
        <div id='app-footer'>
        </div>
      </div>
    );
  }
}

var routes = (
  <Router>
    <Route component={App}>
      <Route path='/' component={TodoList}>
        <Route path='/all' />
        <Route path='/active' />
        <Route path='/complete' />
      </Route>
      <Route path='/about' component={About} />
      <Route path='/login' component={LoginForm} />
      <Route path='/register' component={RegistrationForm} />
    </Route>
  </Router>
);

render(routes, document.getElementById('content'));
