'use strict';

var google = require('./google');


var express = require('express');
var app = express();

app.get('/', function(req, res) {
	var url = google.oauth2Client.generateAuthUrl({
		access_type: google.config.access_type,
		scope: google.config.scopes
	});

	res.send('<a href="' + url + '">login to google</a>');
});


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


function updateAccessToken(tokens, res) {

	console.log('tokens', tokens)
	res.sendStatus(200);

}


app.get('/login', function(req, res) {
	var code = req.query.code;
	console.log('login');

	google.oauth2Client.getToken(code, function(err, tokens) {

		if (!err) {
			console.log('tokens');
			console.log(tokens);

			updateAccessToken(tokens, res);

		} else {
			res.send('error getting token');
			console.log('error getting token');
		}
	});

});