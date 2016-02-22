'use strict';
var google_config = {
	client_id: process.env.GOOGLE_CLIENT_ID,
	client_secret: process.env.GOOGLE_CLIENT_SECRET,
	redirect_uri: (process.env.HOST_URL || 'http://localhost:3000') + '/login',
	access_type: 'offline',
	scopes: [
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/calendar'
	]
};

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(google_config.client_id, google_config.client_secret, google_config.redirect_uri);
var calendar = google.calendar('v3');

exports.oauth2Client = oauth2Client;
exports.calendar = calendar;
exports.config = google_config;