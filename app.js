'use strict'; // so let will work

// DEPENDENCIES

const pjson = require('./package.json');
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// CONSTANTS

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const SERVER_MSG = `Serving ${pjson.name} on port ${PORT}`;
const DEFAULT_MONGO_URL = 'mongodb://localhost/campsite_reviews';
const MONGO_URL = process.env.MONGO_URL || DEFAULT_MONGO_URL;

// MONGOOSE SCHEMAS / MODELS

const CAMPSITE_SCHEMA = new mongoose.Schema({
  name: String,
  imageUrl: String
});

const Campsite = mongoose.model('campsite', CAMPSITE_SCHEMA);

// SETTINGS

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';

// VARIABLES

let campsites = [
  {name:'Campsite1', imageURL: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name:'Campsite2', imageURL: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg'},
  {name:'Campsite3', imageURL: 'https://farm8.staticflickr.com/7439/10131284273_c1728fb490.jpg'},
  {name:'Campsite4', imageURL: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name:'Campsite5', imageURL: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg'},
  {name:'Campsite6', imageURL: 'https://farm3.staticflickr.com/2713/4161240714_a296608148.jpg'}
];

//SERVER

app.listen(PORT, function() {
  console.log(SERVER_MSG);
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

app.post('/campsites', function(req, res) {
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  campsites.push({
    name: name,
    imageURL: imageURL
  });
  res.redirect('/campsites');
});

app.get('/campsites/new', function(req, res) {
  res.render('new');
});

// FUNCTIONS

// MAIN
