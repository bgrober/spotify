'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var SignInBox = require('./signInBox');
var $ = require('jquery');
var Playlist = require('./playlist');
var ArtistSearch = require('./artistSearch');
var state = false;

var Spotify = React.createClass({
  getInitialState() {
    return {
      loggedIn: document.cookie !=='',
      playlist: false
    }
  },

  updatePlaylistState(input) {
    $.ajax({
      type: 'POST',
      url: '/addplaylist',
      data: input,
      success: resp => {
      },
      error: function(err) {
        console.log(err);
      }
    });
    this.setState({
      loggedIn: document.cookie !=='',
      playlist: input
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

module.exports = Spotify;
