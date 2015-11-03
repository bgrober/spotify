'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ProfileBox = require('./profileBox.jsx');
var ActivityBox = require('./activityBox.jsx');
var SignInBox = require('./signin.js');
var SignInHeader = require('./SignInHeader.js');

var App = React.createClass({
  url: __dirname,
  render: function() {
    // console.log(url);
    return (
      <div >
        <SignInBox/>
        <ActivityBox/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
