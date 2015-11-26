'use strict;'

var React = require('react');

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

module.exports = Counter;
