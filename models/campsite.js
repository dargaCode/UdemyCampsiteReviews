
'use strict'; //so 'let' will work

// DEPENDENCIES

const mongoose = require('mongoose');

// SCHEMA & MODEL

const CAMPSITE_SCHEMA = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
});

const Campsite = mongoose.model('campsite', CAMPSITE_SCHEMA);

// EXPORT

module.exports = Campsite;
