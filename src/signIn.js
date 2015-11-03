'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var path = require('path');
var imgPath = path.join(__dirname, '/img/ConnectWithStrava');
var SignInBox = React.createClass({


  render: function() {
    console.log(imgPath);
    return (
      <div>
        <img src="./img/ConnectWithStrava.png"/>
      </div>
    )
  }
});

module.exports = SignInBox;
