'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var ArtistSearch = React.createClass({
  onUpdate() {
    var value = this.refs.form.value;
    this.props.submitHandler(value);
  },
  render() {
    return (
      <div className="searchDiv">
        <form onSubmit={this.onUpdate}>
          <input ref="form" className="search" type="text" placeholder="type artist here...">
          </input>
        </form>
      </div>
    );
  }
});

module.exports = ArtistSearch;
