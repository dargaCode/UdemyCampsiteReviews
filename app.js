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

//SERVER

app.listen(process.env.PORT || PORT_NUM, function() {
  console.log(SERVER_START_MSG);
});

// ROUTES

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campsites', function(req, res) {

  let campsites = [
    {name:'Campsite1', state: 'state1'},
    {name:'Campsite2', state: 'state2'},
    {name:'Campsite3', state: 'state3'},
    {name:'Campsite4', state: 'state4'},
    {name:'Campsite5', state: 'state5'},
    {name:'Campsite6', state: 'state6'}
  ];

  res.render('campsites', {
    campsites: campsites
  });
});
