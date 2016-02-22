'use strict';

var app_timezone = process.env.APP_TIMEZONE || 'America/Denver';
var moment = require('moment-timezone');
moment.tz.setDefault(app_timezone);

exports.config = {
	timezone: app_timezone
};

exports.moment = moment;