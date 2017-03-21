const fs = require('fs');
const express = require('express');
const marked = require('marked');
const _ = require('./date');

const app = express();
const router = express.Router();
const readme = fs.readFileSync('./README.md').toString();
const index = marked(readme);

router.get('/:timestamp', (req, res) => {
  const timestring = req.params.timestamp;
  var timestamp;

  if (isNaN(+timestring)) {
    try {
      timestamp = Date.natural(timestring);
    } catch(e) {
      timestamp = null;
    }
  } else {
    timestamp = Date.unix(timestring);
  }

  res.json({
    unix: timestamp ? timestamp.getUnixTime() : null,
    natural: timestamp ? timestamp.getNaturalDate() : null
  });
});

app.use('/', router);
app.use('/', (_, res) => res.send(index));

const port = process.env.port || 3750;
app.listen(port);
console.log('Listening on ' + port + '...');

exports = module.exports = app;
