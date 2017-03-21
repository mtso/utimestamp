const express = require('express');
const _ = require('./date');
const app = express();

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

  res.json({
    unix: timestamp ? timestamp.getUnixTime() : null,
    natural: timestamp ? timestamp.getNaturalDate() : null
  });
});

const port = process.env.port || 3750;
app.listen(port);
console.log('Listening on ' + port + '...');

exports = module.exports = app;
