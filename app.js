
'use strict'; // so 'let' will work

// DEPENDENCIES - PACKAGE INFO

const pjson = require('./package.json');

// DEPENDENCIES - NPM PACKAGES

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// DEPENDENCIES - DATABASE MODELS

const Campsite = require('./models/campsite.js');

// CONSTANTS

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const SERVER_MSG = `Serving ${pjson.name} on port ${PORT}`;
const DEFAULT_DATABASE_URL = 'mongodb://localhost/campsite_reviews';
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
const DATABASE_MSG = `Connecting to database at ${DATABASE_URL}`;

// SETTINGS

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';

// VARIABLES

// ROUTES

app.get('/', function(req, res) {
  res.render('landing');
});

  //Route - Index
app.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, foundCampsites) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      res.render('index', {campsites: foundCampsites});
    }
  });
});

  //Route - New
app.get('/campsites/new', function(req, res) {
  res.render('new');
});

  //Route - Create
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

  //Route - Show
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

  //Route - Edit

  //Route - Update

  //Route - Destroy

// FUNCTIONS

// MAIN

 //Start Server
app.listen(PORT, function() {
  console.log(SERVER_MSG);
});

 //Start Mongo
mongoose.connect(DATABASE_URL, function() {
  console.log(DATABASE_MSG)
});
