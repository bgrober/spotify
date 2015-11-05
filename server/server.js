var express = require('express');
var request = require('request');
var path = require('path');
var passport = require('passport');
var util = require('util');
var StravaStrategy = require('passport-strava').Strategy;
var bodyParser  = require('body-parser');
var http = require('http');
var cookieParser = require('cookie-parser');
var migrateUsers = require('../database/user_database.js');
var migrateActivities = require('../database/activities_database.js');
var Router = require('react-router');
var React = require('react');
var cookieController = require('./utils/cookieController');


var app = express();
var server = http.createServer(app);

const STRAVA_CLIENT_ID = '8506';
const STRAVA_CLIENT_SECRET = 'e811e15087ce614ae212c85876706235a7bc1d41';
var ACCESS_TOKEN;
var USER_ID;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the StravaStrategy within Passport.
passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    ACCESS_TOKEN = accessToken;
    process.nextTick(function () {
      migrateUsers.syncUserModel(profile._json);
      USER_ID = profile._json.id;
      console.log(USER_ID);
      return done(null, profile._json);
    });
  }
));

// configure Express
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  app.use(cookieParser());
  app.use(bodyParser.urlencoded());
  app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, './../')));

app.get('/', (req,res) => res.redirect('/login'));

//Account Page only accessible if authenticated. This will set a cookie as well which React will use to determine logic.
app.get('/account', ensureAuthenticated, cookieController.setSSIDCookie, function(req, res){
  request({url:` https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=${ACCESS_TOKEN}`}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var activitiesRes = JSON.parse(body);
      activitiesRes.forEach(obj => migrateActivities.syncFunction(obj));
      migrateActivities.updateAverage(activitiesRes[0]);
      console.log("YAYYAYYY")
    }
    res.sendFile(path.join(__dirname, './../index.html'));
  });
});

// Login URL
app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, './../index.html'));
});

app.get('/profile', function(req, res){
  res.sendFile(path.join(__dirname, './../index.html'));
});


//get request for data from database
app.post('/userdata', function(req, res){
  migrateUsers.findAll(USER_ID, req, res);
});

app.post('/activitiesdata', function(req, res){
  migrateActivities.findAll(USER_ID, req, res);
});

// Redirect to Strava oAuth
app.get('/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }),
  function(req, res){
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  });

//Strava Callback Redirect
app.get('/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });


app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
//
// function router(req, res, next){
//   var context = {
//   routes: routes, location: req.url
//   };
// Router.create(context).run(function ran (Handler, state) {
//   res.render('layout', {
//     reactHtml: React.renderToString(<Handler />)
//   });
// });
// }
