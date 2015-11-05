'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import Name from './name';
import Picture from './picture';
// var Picture = require('./picture');

var ProfileBox = React.createClass({
  render: function() {
    return (
      <div>
        <Picture info={this.props.info} user={this.props.user}/>
        <Name info={this.props.info} user={this.props.user}/>
      </div>
    );
  }
});

module.exports = ProfileBox;
