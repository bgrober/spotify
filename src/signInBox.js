'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = React.createClass({
  render() {
    return (
      <div>
        <a href="http://localhost:3000/auth/spotify">
          <img src="./spotify.png"/>
        </a>
      </div>
    );
  }
});

module.exports = SignInBox;
