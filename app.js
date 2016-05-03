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
    {name:'Campsite1', photo: 'http://www.photosforclass.com/download/10131087094'},
    {name:'Campsite2', photo: 'http://www.photosforclass.com/download/14435096036'},
    {name:'Campsite3', photo: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
    {name:'Campsite4', photo: 'http://www.photosforclass.com/download/1430198323'},
    {name:'Campsite5', photo: 'https://farm3.staticflickr.com/2245/2150502974_5231368284.jpg'},
    {name:'Campsite6', photo: 'https://farm3.staticflickr.com/2713/4161240714_a296608148.jpg'}
  ];

  res.render('campsites', {
    campsites: campsites
  });
});
