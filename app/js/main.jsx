import React from 'react';

class Hello extends React.Component {
  render() {
    return "test"
  }
}

React.render(<Hello/>, document.getElementById('hello'));
