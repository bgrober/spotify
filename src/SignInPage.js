'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = require('./SignInBox');
var SignInHeader = require('./SignInHeader');

var SignInPage = React.createClass({

  render() {
    return (
      <div>
        <SignInHeader/>
        <SignInBox/>
      </div>
    );
  }
});

module.exports = SignInPage;
