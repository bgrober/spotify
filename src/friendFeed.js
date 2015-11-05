'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FriendDiv from './friendDiv';

var FriendFeed = React.createClass({

  render: function() {
    let data = []
    let userSpeed = 0;
    var userId = +this.props.user;
    this.props.info.forEach((elem, i) => {
      if(elem.user_id === userId) {
        userSpeed = elem.average_speed;
      }
      else{
        data.push(elem);
      }
    })
    console.log(data, userSpeed);
    var friend = data.map( function(elem, i) {
      return <FriendDiv info={data[i]} key={i} speed={userSpeed}/>
    });
    return (
      <div className="FriendFeed">
        {friend}
      </div>
    );
  }
});

module.exports = FriendFeed;
