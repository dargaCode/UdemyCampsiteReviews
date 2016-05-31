
'use strict'; // so 'let' will work

// DEPENDENCIES

const mongoose = require('mongoose');

// DATABASE MODELS

const Campsite = require('./models/campsite.js');
const Comment = require('./models/comment.js');

// NODE MODULES

const path = require('path');

// CONSTANTS

const FILENAME = path.basename(__filename);
const FILENAME_MSG_PREFIX = `* ${FILENAME} - `;
const EMPTY_DB_MSG = `${FILENAME_MSG_PREFIX}Removed all entries from database`;
const SEED_CAMPSITE_MSG = `${FILENAME_MSG_PREFIX}Created dummmy campsite - `;
const SEED_COMMENT_MSG = `${FILENAME_MSG_PREFIX}Created dummmy comment - `;
const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim fringilla mollis. Aliquam mollis enim nec sagittis imperdiet. Aenean ut justo id urna rutrum tincidunt. Phasellus blandit, diam vitae lobortis volutpat, urna mi finibus libero, in molestie libero nibh nec nulla. Aliquam interdum lobortis varius. Vivamus porttitor ipsum diam, non sagittis urna volutpat at. Maecenas sodales mi sit amet nulla vestibulum tincidunt. Maecenas risus purus, accumsan vitae suscipit in, venenatis sed nibh.';
const DUMMY_CAMPSITES = [
  {
    name:'Dummy Campsite 1',
    imageUrl: 'https://farm5.staticflickr.com/4068/4367308345_36f47390e1.jpg',
    description: LOREM_IPSUM,
  },
  {
    name:'Dummy Campsite 2',
    imageUrl: 'https://farm9.staticflickr.com/8322/7887662552_8667d69960.jpg',
    description: LOREM_IPSUM,
  },
  {
    name:'Dummy Campsite 3',
    imageUrl: 'https://farm9.staticflickr.com/8206/8265812638_8100a96382.jpg',
    description: LOREM_IPSUM,
  },
  {
    name:'Dummy Campsite 4',
    imageUrl: 'https://farm8.staticflickr.com/7250/7467209450_a8df729b57.jpg',
    description: LOREM_IPSUM,
  },
  {
    name:'Dummy Campsite 5',
    imageUrl: 'https://farm5.staticflickr.com/4117/4741325076_2d2b5d70dc.jpg',
    description: LOREM_IPSUM,
  },
];
const DUMMY_COMMENT = {
  author: 'Dummy Author',
  text: 'Dummy comment text',
};

// FUNCTIONS

function removeAllCampsites() {
  Campsite.remove({}, function(err) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      console.log(EMPTY_DB_MSG);
      addDummyCampsites();
    }
  });
};

function addDummyCampsites() {
  DUMMY_CAMPSITES.forEach(function(campsite) {
    Campsite.create(campsite, function(err, createdCampsite) {
      if (err) {
        console.log('ERROR:', err);
      } else {
        console.log(SEED_CAMPSITE_MSG + createdCampsite.name);
        addDummyComment(createdCampsite);
      }
    });
  });
};

function addDummyComment(campsite) {
  Comment.create(DUMMY_COMMENT, function(err, createdComment) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      campsite.comments.push(createdComment);
      campsite.save();
      console.log(SEED_COMMENT_MSG + createdComment.author);
    }
  });
};

// MAIN

function seedDatabase() {
  removeAllCampsites();
};

module.exports = seedDatabase;
