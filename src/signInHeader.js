'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var SignInHeader = React.createClass({
  render() {
    return (
      <div>
        <h1> Find Accountability </h1>
        <img src="./img/ConnectWithStrava.jpg"/>
      </div>
    );
  }
});

module.exports = SignInHeader;
