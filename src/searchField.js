'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var SearchField = React.createClass({
  onUpdate() {
    var value = this.refs.form.value;
    this.props.submitHandler(value);
  },
  render() {
    return (
      <div className="searchDiv">
        <form ref="form" onSubmit={this.onUpdate}>
          <input className="search" type="text" placeholder="type artist here...">
          </input>
        </form>
      </div>
    );
  }
});

module.exports = SearchField;
