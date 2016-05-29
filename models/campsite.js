
// DEPENDENCIES

const mongoose = require('mongoose');

// DB MODEL

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

module.exports = Campsite;
