// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const parseDate = (input) => {
  if (!input) return new Date(); // Si el input està vacio, devuelve la fecha actual
  return isNaN(input) ? new Date(input) : new Date(parseInt(input)); // Si el input no es un entero, devuelve un string de fecha, caso contrario devuelve un timestamp Unix
};

// Separo las dos funciones para mayor claridad y modularidad

app.get('/api/:date_string?', (req, res) => {
  const date = parseDate(req.params.date_string);
  res.json(
    isNaN(date.getTime())
      ? { error: "Invalid Date" } // Si la fecha es invalida, devuelve un error
      : { unix: date.getTime(), utc: date.toUTCString() } // Si la fecha es un entero, devuelve un objeto con el timestamp Unix y la fecha en utc
  );
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
