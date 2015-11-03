var React = require('react');
var ReactDOM = require('react-dom');

var SignInBox = React.createClass({
  render() {
    return (
      <a href="/auth/strava">
        <img src="./build/img/ConnectWithStrava.png"/>
      </a>
    )
  }
});

module.exports = SignInBox;
