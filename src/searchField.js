'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var SearchField = React.createClass({
  render() {
    return (
      <div className="searchDiv">
        <form onSubmit={this.props.submitHandler}>
          <input className="search" type="text" placeholder="type artist here...">
          </input>
        </form>
      </div>
    );
  }
});

module.exports = SearchField;
