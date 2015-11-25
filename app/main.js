import React from 'react';
import ImageGrid from './components/ImageGrid';
import ImageActions from './actions/ImageActions';

class Hello extends React.Component {
  render() {
    return <h1>Hello Koa!</h1>
  }
}

class World extends React.Component {
  render() {
    return <ImageGrid/>
  }
}

const Counter = React.createClass({
  getInitialState: function() {
    return {
      presscount: 0,
    }
  },
  handleClick: function() {
    this.setState({
      presscount: this.state.presscount + 1,
    });
  },
  render: function() {
    return (
      <div>
        <button className='btn btn-primary' onClick={this.handleClick}>
          Pressed {this.state.presscount} times
        </button>
      </div>
    );
  }
});

setInterval(function() {
  ImageActions.fetchList();
}, 5000);

React.render(<Hello/>, document.getElementById('hello'));
React.render(<World/>, document.getElementById('world'));
React.render(<Counter/>, document.getElementById('counter'));
