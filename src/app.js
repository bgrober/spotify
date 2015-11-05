'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = require('./signInBox');
var $ = require('jquery');
var SearchField = require('./searchField');

var App = React.createClass({
  getInitialState() {
    return {
      loggedIn: true,
    }
  },

  postArtist() {
    $.ajax({
      type: 'POST',
      url: '/auth',
      data: this.refs.artist.getDOMNode().value,
      success: resp => {
        this.setState({
          activities: resp
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
    },
  deleteCookie() {
    delete document.cookie;
    this.setState({
      loggedIn: false,
      data: [],
      user: ''
    })
  },
  render() {
    return (
      <div className="field">
        {this.state.loggedIn ? (<SearchField refs="artist" submitHandler={this.postArtist}/>) : (<SignInBox/>)}
      </div>
    )
  }
})


ReactDOM.render((
  <App/>
), document.getElementById('container'))
