'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Picture = React.createClass({
  render: function() {
    var data = []
    var userId = +this.props.user;
    this.props.info.forEach(elem => {
      // console.log(elem.user_id, userId);
      if(elem.user_id === userId){
        data.push(elem.profilepic);
      }
    });
    // console.log(data);
    return(
      <img src={data[0]}/>
    )
  }
});

module.exports = Picture;
