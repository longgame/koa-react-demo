import React from 'react';

class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

class World extends React.Component {
  render() {
    return <h2>Gulp</h2>
  }
}

React.render(<Hello/>, document.getElementById('hello'));
React.render(<World/>, document.getElementById('world'));
