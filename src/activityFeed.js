'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ActivityBox from './activityBox';
import Map from './map';

var ActivityFeed = React.createClass({
  getInitialState() {
    return{
      polyline: '',
      lat: 33.9805061,
      lon: -118.42188639999998,
    };
  },
  update: function(e,id) {
    // debugger;
    var self = this;
    var actId = +id.slice(id.indexOf('$') + 1);
    this.props.activities.slice(-5).forEach(function(elem, i) {
      console.log(elem.activity_id, actId);
      if(elem.activity_id === actId) {
        self.setState({
          polyline: elem.polyline,
          lat: elem.start_latitude,
          lon: elem.start_longitude
        });
      }
    });
  },
  render: function() {
    console.log(this.state.lat, 'hello');
    var self = this;
    var runs = this.props.activities.slice(-5).map( function(elem, i) {
      if(elem.polyline)
      return <ActivityBox clickHandler={self.update} actName={elem.name} key={elem.activity_id} location={`${elem.location_city}, ${elem.location_state}`} workout={elem.type}/>
    });
    return (
      <div>
        <div className="centerIt">{runs}</div>
        <Map lat={this.state.lat} lon={this.state.lon} polyline={this.state.polyline}/>
      </div>
    );
  }
});

module.exports = ActivityFeed;
