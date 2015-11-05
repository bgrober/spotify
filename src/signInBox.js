'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = React.createClass({
  render() {
    return (
      <div>
        <a href="http://localhost:3000/auth/strava"><img src="./build/img/ConnectWithStrava.jpg"/></a>
      </div>
    );
  }
});

module.exports = SignInBox;
