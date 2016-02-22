var google = require('./google');
var time = require('./time');

var CronJob = require('cron').CronJob;

function getEvents(err, response) {

	console.log('response');
	console.log(response);
	if (err) {
		console.log('The API returned an error: ' + err);
	}

	var events = response.items;

	if (events.length == 0) {
		console.log('No upcoming events found.');
	} else {
		console.log('Upcoming 10 events:');
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			var event_id = event.id;
			var summary = event.summary;
			var start = event.start.dateTime || event.start.date;
			var end = event.end.dateTime || event.end.date;

			console.log('EVENT', event_id, summary, start, end);

		}

	}

}

function cache() {

	var current_datetime = time.moment().toISOString();

	google.calendar.events.list({
		auth: google.oauth2Client,
		calendarId: 'primary',
		timeMin: current_datetime,
		maxResults: 10,
		singleEvents: true,
		orderBy: 'startTime'
	}, getEvents);

}


function init(tokens) {

	var tokens = {};

	google.oauth2Client.setCredentials({
		'access_token': tokens.access_token,
		'refresh_token': tokens.refresh_token
	});

	new CronJob('0 0 * * *', cache, null, true, time.config.timezone);
	//cache(); //for testing

}