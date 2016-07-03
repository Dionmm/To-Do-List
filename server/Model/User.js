'use strict';

var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  "email": { type: String, required: true },
  "password": { type: String, required: true },
  "passwordChangeToken": { type: String, default: null },
  "admin": { type: Boolean, required: true }
});


module.exports = mongoose.model("User", userSchema)
