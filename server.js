var express = require('express');
var app = express();
var SpotifiyWebApi = require('spotify-web-api-node');
var path = require('path');

var spotify = new SpotifiyWebApi({
	clientId: 'f0161a5f2d4944f38e82d4d91f0505b6',
	clientSecert: 'af63f3edc29d44a4b7735fb207344a88',
	redirect: 'http://127.0.0.1:3000'
});
app.use(express.static(__dirname));
// set the access token

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/auth', function(req, res) {
	spotify.clientCredentialsGrant()
	.then(function(data) {
		console.log('hello');
	});
});
// //get artist from the search field
//
// spotify.getArtistTopTracks(data, 'US')
// 	.then(function(data) {
//
// 		//add the tracks to the playlist
// 		spotifyApi.addTracksToPlaylist('thelinmichael',
// 			playlist,
// 			["spotify:track:", "spotify:track:"])
// 				.then(function(data) {
// 					console.log('Added tracks to playlist!');
// 				}, function(err) {
// 					console.log('Something went wrong!', err);
// 				});

	//
	// }, function(err) {
	// 	console.error(err);
	// });

spotify.createPlaylist('will', 'New Playlist', {public: true})


app.listen(3000);
