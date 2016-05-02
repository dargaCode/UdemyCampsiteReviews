
// DEPENDENCIES

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

// SETTINGS

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';

// CONSTANTS

const PORT_NUM = 3000;
const SERVER_START_MSG = 'Serving Campsite Reviews on port ' + PORT_NUM;

//SERVER

app.listen(process.env.port || PORT_NUM, function() {
  console.log(SERVER_START_MSG);
});

// ROUTES

app.get('/', function(req, res) {
  res.send('Campsite Reviews');
});
