'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ProfileBox = require('./profileBox.jsx');
var ActivityBox = require('./activityBox.jsx');
var SignInBox = require('./signIn.js');
var SignInHeader = require('./SignInHeader.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var createHistory = require('history').createHistory;
// var useBasename = require('history').useBasename;

var App = React.createClass({
  getInitialState() {
    return {
      loggedIn: false
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  // componentWillMount() {
  //   auth.onChange = this.updateAuth
  //   auth.login()
  // },

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})


ReactDOM.render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="/login" component={SignInHeader} />
      <Route path="/" component={SignInBox} />
    </Route>
  </Router>
), document.getElementById('container'))
