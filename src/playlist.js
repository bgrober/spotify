'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var Playlist = React.createClass({
  onUpdate() {
    var value = this.refs.form.value;
    this.props.submitHandler(value);
  },
  render() {
    return (
      <div className="searchDiv">
        <form onSubmit={this.onUpdate}>
          <input ref="form" className="search" type="text" placeholder="type playlist name here...">
          </input>
        </form>
      </div>
    );
  }
});

module.exports = Playlist;
