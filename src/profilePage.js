'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileBox from './profileBox';
import ActivityFeed from './activityFeed';

var ProfilePage = React.createClass({

  render() {
    return (
      <div>
        <ProfileBox info={this.props.info} user={this.props.user}/>
        <ActivityFeed activities={this.props.activities}/>
      </div>
    );
  }
});

module.exports = ProfilePage;
