'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Name = React.createClass({

  render: function() {
    var data = []
    var userId = +this.props.user;
    this.props.info.forEach(elem => {
      // console.log(elem.user_id, userId);
      if(elem.user_id === userId){
        data.push(`${elem.firstname} ${elem.lastname}`);
        data.push(elem.username);
        data.push(`${elem.city}, ${elem.state}`);
      }
    });
    // console.log(data);
    return(
      <div>
        <p>{data[0]}</p>
        <p>{data[1]}</p>
        <p>{data[2]}</p>
      </div>
    )
  }
});

module.exports = Name;
