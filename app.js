
'use strict'; //so 'let' will work

// DEPENDENCIES

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// DATABASE MODELS

const Campsite = require('./models/campsite.js');
const Comment = require('./models/comment.js');

// OTHER LOCAL SCRIPTS

const pjson = require('./package.json');
const seedDatabase = require('./seedDatabase.js');

// CONSTANTS

const PUBLIC_PATH = `${__dirname}/public`;
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const SERVER_MSG = `Serving ${pjson.name} on port ${PORT}`;
const DEFAULT_DATABASE_URL = 'mongodb://localhost/campsite_reviews';
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
const DATABASE_MSG = `Connecting to database at ${DATABASE_URL}`;


// SETTINGS

app.set('view engine', 'ejs');
app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';

// VARIABLES

// ROUTES = ROOT

app.get('/', function(req, res) {
  res.render('landing');
});

// ROUTES - CAMPSITES

  //Index Campsite Route
app.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, foundCampsites) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      res.render('campsites/index', {campsites: foundCampsites});
    }
  });
});

  //New Campsite Route
app.get('/campsites/new', function(req, res) {
  res.render('campsites/new');
});

  //Create Campsite Route
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

  //Show Campsite Route
app.get('/campsites/:id', function(req, res) {
  const campsiteId = req.params.id;

  Campsite
    .findById(campsiteId)
    .populate('comments')
    .exec(function(err, foundCampsite) {
      if (err) {
        console.log('ERROR:', err);
        res.redirect('/campsites/');
      } else {
        res.render('campsites/show', {campsite: foundCampsite});
      }
    });
});

  //Edit Campsite Route

  //Update Campsite Route

  //Destroy Campsite Route

// ROUTES - COMMENTS

  //New Comment Route
app.get('/campsites/:id/comments/new', function(req, res) {
  const campsiteId = req.params.id;

  Campsite.findById(campsiteId, function(err, foundCampsite) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      res.render('comments/new', {campsite: foundCampsite});
    }
  });
});

  //Create Comment Route
app.post('/campsites/:id/comments', function(req, res) {
  const campsiteId = req.params.id;
  const requestedComment = req.body.comment;

  Campsite.findById(campsiteId, function(err, foundCampsite) {
    if (err) {
      console.log('ERROR:', err);
      res.redirect('/campsites');
    } else {
      Comment.create(requestedComment, function(err, createdComment) {
        if (err) {
          console.log('ERROR:', err);
          res.redirect('/campsites/' + campsiteId);
        } else {
          foundCampsite.comments.push(createdComment);
          foundCampsite.save();
          res.redirect('/campsites/' + campsiteId);
        }
      });
    }
  });
});

// FUNCTIONS

function initialize() {
  app.listen(PORT, function() {
    console.log(SERVER_MSG);
  });

  mongoose.connect(DATABASE_URL, function() {
    console.log(DATABASE_MSG);
  });
};

// MAIN

initialize();
// seedDatabase();
