'use strict';

var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  "Email": { type: String, required: true },
  "Password": { type: String, required: true },
  "PasswordChangeToken": { type: String, required: false },
  "UserGroup": { type: String, required: true }
});


module.exports = mongoose.model("User", newUserSchema)
