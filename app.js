'use strict'; // so let will work

// DEPENDENCIES

const pjson = require('./package.json');
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// MODELS

const Campsite = require('./models/campsite.js');

// CONSTANTS

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const SERVER_MSG = `Serving ${pjson.name} on port ${PORT}`;
const DEFAULT_MONGO_URL = 'mongodb://localhost/campsite_reviews';
const MONGO_URL = process.env.MONGO_URL || DEFAULT_MONGO_URL;

// SETTINGS

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';
mongoose.connect(MONGO_URL);

// VARIABLES

//SERVER

app.listen(PORT, function() {
  console.log(SERVER_MSG);
});

// ROUTES

app.get('/', function(req, res) {
  res.render('landing');
});

  // Index
app.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, foundCampsites) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      res.render('index', {campsites: foundCampsites});
    }
  });
});

  // New
app.get('/campsites/new', function(req, res) {
  res.render('new');
});

  // Create
app.post('/campsites', function(req, res) {
  const requestedCampsite = req.body.campsite;

  Campsite.create(requestedCampsite, function(err, createdCampsite) {
    if (err) {
      console.log('ERROR:', err);
      res.redirect('/campsites/new');
    } else {
      res.redirect('/campsites');
    }
  });
});

  // Show
app.get('/campsites/:id', function(req, res) {
  const id = req.params.id;

  Campsite.findById(id, function(err, foundCampsite) {
    if (err) {
      console.log('ERROR:', err);
      res.redirect('/campsites/');
    } else {
      res.render('show', {site: foundCampsite});
    }
  });
});

  // Edit

  // Update

  // Destroy

// FUNCTIONS

// MAIN
