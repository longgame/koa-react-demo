'use strict;'

require('bootstrap');
require('react-bootstrap');

import React from 'react';
import { Button } from 'react-bootstrap';

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
        <Button 
          bsStyle= { 'primary' }
          bsSize= { 'large' }
          onClick= { this.handleClick }
        >{this.state.presscount}
        </Button>
      </div>
    );
  }
});

module.exports = Counter;
