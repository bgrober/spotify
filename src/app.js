'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = require('./signInBox');
var $ = require('jquery');
var Playlist = require('./playlist');
var ArtistSearch = require('./artistSearch');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;

var App = React.createClass({
  getInitialState() {
    return {
      loggedIn: document.cookie !=='',
      playlist: false
    }
  },

  updatePlaylistState(input) {
    console.log('test');
    $.ajax({
      type: 'POST',
      url: '/addplaylist',
      data: input,
      success: resp => {
        console.log('hello')
        this.setState({
          loggedIn: document.cookie !=='',
          playlist: true
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  postArtist(input) {
      $.ajax({
      type: 'POST',
      url: '/addartist',
      data: input,
      success: resp => {
        console.log(resp);
      },
      error: function(err) {
        console.log(err);
      }
    });
    },

  render() {
    return (
      <div className="field">
        {!this.state.loggedIn ? (
          <SignInBox/>) : (!this.state.playlist ?
            (<Playlist submitHandler={this.updatePlaylistState}/>) :
            (<ArtistSearch submitHandler={this.postArtist}/>))}

      </div>
    )
  }
})


ReactDOM.render((
<App/>
), document.getElementById('container'))
