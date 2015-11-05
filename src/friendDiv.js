'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var diff = 0;

var FriendDiv = React.createClass({
  shouldComponentUpdate() {

  },
  componentWillMount() {
    var userLog = moment(this.props.speed, "mm:ss");
    var buddy = moment(this.props.info.average_speed, "mm:ss");
    if(userLog.isBefore(buddy)){
      diff = 'You are on average '+ moment(buddy.diff(userLog)).format("mm:ss")+' minutes/mile faster.'
    }
    else{
        diff = 'You are on average '+moment(userLog.diff(buddy)).format("mm:ss")+ ' minutes/mile slower.'
    }
  },
  render: function() {
    return(
      <div className="proBox">
        <img src={this.props.info.profilepic}/>
          <p className="text-primary"><Link to={`/buddies/${this.props.info.username}`}> {`${this.props.info.firstname} ${this.props.info.lastname}`}</Link></p>
          <p className="text-primary">{this.props.info.username}</p>
          <p className={diff.endsWith('slower.') ? "text-danger" : "text-success"}>{diff}</p>
      </div>
    )
  }
});
<div class="panel panel-primary">
  <div class="panel-heading">
    <h3 class="panel-title">Panel primary</h3>
  </div>
  <div class="panel-body">
    Panel content
  </div>
</div>
module.exports = FriendDiv;
