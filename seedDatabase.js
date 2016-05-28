
'use strict'; // so 'let' will work

// DEPENDENCIES

const mongoose = require('mongoose');

// DATABASE MODELS

const Campsite = require('./models/campsite');

// NODE MODULES

const path = require('path');

// CONSTANTS

const FILENAME = path.basename(__filename);
const FILENAME_MSG_PREFIX = `* ${FILENAME} - `;
const EMPTY_DB_MSG = `${FILENAME_MSG_PREFIX}Removed all entries from database`;
const SEED_CAMPSITE_MSG = `${FILENAME_MSG_PREFIX}Created dummmy campsite - `;
const DUMMY_CAMPSITES = [
  {
    name:'Dummy Campsite 1',
    imageUrl: 'https://farm5.staticflickr.com/4068/4367308345_36f47390e1.jpg',
    description: 'This is the description of Dummy Campsite 1',
  },
  {
    name:'Dummy Campsite 2',
    imageUrl: 'https://farm9.staticflickr.com/8322/7887662552_8667d69960.jpg',
    description: 'This is the description of Dummy Campsite 2',
  },
  {
    name:'Dummy Campsite 3',
    imageUrl: 'https://farm9.staticflickr.com/8206/8265812638_8100a96382.jpg',
    description: 'This is the description of Dummy Campsite 3',
  },
  {
    name:'Dummy Campsite 4',
    imageUrl: 'https://farm8.staticflickr.com/7250/7467209450_a8df729b57.jpg',
    description: 'This is the description of Dummy Campsite 4',
  },
  {
    name:'Dummy Campsite 5',
    imageUrl: 'https://farm5.staticflickr.com/4117/4741325076_2d2b5d70dc.jpg',
    description: 'This is the description of Dummy Campsite 5',
  },
];

// FUNCTIONS

function removeAllCampsites() {
  let errCount = 0;

  Campsite.remove({}, function(err) {
    if (err) {
      console.log('ERROR:', err);
    } else {
      console.log(EMPTY_DB_MSG);
    }
  });

  if (!errCount) {

  }
}

function addDummyCampsites() {
  DUMMY_CAMPSITES.forEach(function(campsite) {

    Campsite.create(campsite, function(err, createdCampsite) {
      if (err) {
        console.log('ERROR:', err);
      } else {
        console.log(SEED_CAMPSITE_MSG + createdCampsite.name);
      }
    });
  });
}

// MAIN

function seedDatabase() {
  removeAllCampsites();
  addDummyCampsites();
};

module.exports = seedDatabase;
