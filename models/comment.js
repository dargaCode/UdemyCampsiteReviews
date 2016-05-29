
'use strict'; //so 'let' will work

// DEPENDENCIES

const mongoose = require('mongoose');

// SCHEMA & MODEL

const COMMENT_SCHEMA = new mongoose.Schema({
  author: String,
  text: String,
});

const Comment = mongoose.model('Comment', COMMENT_SCHEMA);

// EXPORT

module.exports = Comment;
