'use strict'; // so let will work

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

// VARIABLES

let campsites = [
  {name:'Campsite1', photo: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name:'Campsite2', photo: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg'},
  {name:'Campsite3', photo: 'https://farm8.staticflickr.com/7439/10131284273_c1728fb490.jpg'},
  {name:'Campsite4', photo: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name:'Campsite5', photo: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg'},
  {name:'Campsite6', photo: 'https://farm3.staticflickr.com/2713/4161240714_a296608148.jpg'}
];

//SERVER

app.listen(process.env.PORT || PORT_NUM, function() {
  console.log(SERVER_START_MSG);
});

// ROUTES

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campsites', function(req, res) {
  res.render('campsites', {
    campsites: campsites
  });
});
