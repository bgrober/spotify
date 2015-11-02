'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var STRAVA_ACCESS_TOKEN = '85e9e7d17d8d442edb90a8f7c112dfce2de6a7b4';
var STRAVA_CLIENT_ID = '8506';
var STRAVA_CLIENT_SECRET = 'e811e15087ce614ae212c85876706235a7bc1d41';
var ProfileBox = require('./profileBox.jsx');
var ActivityBox = require('./activityBox.jsx');

var App = React.createClass({
    render: function() {
      return (
        <div >
          <ProfileBox  url="https://www.strava.com/api/v3/athlete?per_page=1&access_token=85e9e7d17d8d442edb90a8f7c112dfce2de6a7b4&callback=?"/>
          <ActivityBox url="https://www.strava.com/api/v3/activities?page=2&per_page=200&access_token=85e9e7d17d8d442edb90a8f7c112dfce2de6a7b4&callback=?"/>
        </div>
      );
    }
});

ReactDOM.render(
  <App />,
  document.body
);
