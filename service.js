const express = require('express');

const app = express();

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

Date.prototype.getUnixTime = function() {
  return Math.floor(this.getTime() / 1000);
}

Date.prototype.getNaturalDate = function() {
  return MONTHS[this.getUTCMonth()] + ' ' + this.getUTCDate() + ', ' + this.getUTCFullYear();
}

Date.unix = function(unixTimestamp) {
  const unixtime = new Date(+unixTimestamp * 1000);
  if (isNaN(unixtime.getTime())) {
    return null;
  } else {
    return unixtime;
  }
}

Date.natural = function(timestring) {
  timestring = timestring.split(' ');

  const month = MONTHS.map(function(str) {
    return str.substr(0, 2);
  }).indexOf(timestring[0].substr(0, 2));

  const date = +timestring[1].substr(0, timestring[1].length - 1);
  const year = +timestring[2];

  return new Date(year, month, date-1, 16);
}

app.get('/:timestamp', function(req, res) {
  const timestring = req.params.timestamp;
  
  var timestamp;
  if (isNaN(+timestring)) {
    console.log('natural');
    try {
      timestamp = Date.natural(timestring);
    } catch(e) {
      timestamp = null;
    }
  } else {
    console.log('unix num');
    timestamp = Date.unix(timestring);
  }

  const unixtime = timestamp ? timestamp.getUnixTime() : null;

  res.json({
    unix: timestamp ? timestamp.getUnixTime() : null,
    natural: timestamp ? timestamp.getNaturalDate() : null
  });
});

// app.use('/', router);

exports = module.exports = app;

// natural: timestamp.toLocaleDateString('en-GB', {
//   month: 'long',
//   day: 'numeric',
//   year: 'numeric'
// })