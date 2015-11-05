'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;

var ActivityBox = React.createClass({
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.clickHandler}>
        {`${this.props.actName} ${this.props.location} ${this.props.workout}`}
      </button>
    );
  }
});

module.exports = ActivityBox;
