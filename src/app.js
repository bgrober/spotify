'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var FriendFeed = require('./friendFeed');
var SignInPage = require('./SignInPage');
var ProfilePage = require('./profilePage');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var createHistory = require('history').createHistory;
var $ = require('jquery');
// var useBasename = require('history').useBasename;

var App = React.createClass({
  getInitialState() {
    return {
      loggedIn: document.cookie !== '',
      data: [],
      user: document.cookie.slice(5),
      activities: []
    }
  },

  componentDidMount() {
    $.ajax({
    type: 'POST',
    url: '/userdata',
    success: resp => {
      this.setState({
        data: resp
      });
    },
    error: function(err) {
      console.log(err);
    }
  });
  $.ajax({
  type: 'POST',
  url: '/activitiesdata',
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
    // console.log(this.state.activities[0]);
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to={this.state.loggedIn ? '/buddies' : '/'}>Home</Link></li>
                <li><Link to={this.state.loggedIn ? '/profile' : '/'}>Profile</Link></li>
                <li><Link to={this.state.loggedIn ? '/buddies' : '/'}>Buddies</Link></li>
                <li>
                  {this.state.loggedIn ? (
                    <Link onClick={this.deleteCookie} to="/">Log out</Link>
                  ) : (
                    <Link to="/">Sign in</Link>
                  )}
                </li>
              </ul>
            </div>
            </div>
          </div>
        </nav>
        {this.state.loggedIn ? '' : (
          <SignInPage/>
        )}
        {this.props.children && React.cloneElement(this.props.children, {
          info: this.state.data,
          user: this.state.user,
          activities: this.state.activities
        })}
      </div>
    )
  }
})


ReactDOM.render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="/buddies" component={FriendFeed}></Route>
      <Route path="/profile" component={ProfilePage}></Route>
      // <Route path="/buddy" component={UserPage}></Route>
    </Route>
  </Router>
), document.getElementById('container'))
