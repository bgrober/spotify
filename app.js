var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    swig = require('swig'),
    SpotifyStrategy = require('./passport-spotify/index').Strategy;
    cookieController = require('./cookieController');
    SpotifiyWebApi = require('spotify-web-api-node');


var consolidate = require('consolidate');

var appKey = 'f0161a5f2d4944f38e82d4d91f0505b6';
var appSecret = 'af63f3edc29d44a4b7735fb207344a88';
var ACCESSTOKEN = '';
// clientId: 'f0161a5f2d4944f38e82d4d91f0505b6',
// clientSecert: 'af63f3edc29d44a4b7735fb207344a88',
// redirect: 'http://127.0.0.1:3000'

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var spotify = new SpotifiyWebApi({
	clientId: 'f0161a5f2d4944f38e82d4d91f0505b6',
	clientSecert: 'af63f3edc29d44a4b7735fb207344a88',
	redirect: 'http://127.0.0.1:3000'
});
// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://127.0.0.1:3000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    ACCESSTOKEN = accessToken;
    spotify.setAccessToken(ACCESSTOKEN);
    spotify.createPlaylist('will', 'New Playlist', {public: true})
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));

var app = express();

// configure Express
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));

app.engine('html', consolidate.swig);

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.post('/addartist', function(req, res){
  console.log(req.body);
  spotify.getArtistTopTracks(data, 'US')
	.then(function(data) {

		//add the tracks to the playlist
		spotifyApi.addTracksToPlaylist('thelinmichael',
			playlist,
			["spotify:track:", "spotify:track:"])
				.then(function(data) {
					console.log('Added tracks to playlist!');
				}, function(err) {
					console.log('Something went wrong!', err);
				});


	}, function(err) {
		console.error(err);
	});
});



// app.get('/account', ensureAuthenticated, cookieController.setSSIDCookie, function(req, res){
//   res.render('account.html', { user: req.user });
// });
//
// app.get('/login', function(req, res){
//   res.render('login.html', { user: req.user });
// });

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['playlist-modify-private', 'playlist-modify-public'], showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
