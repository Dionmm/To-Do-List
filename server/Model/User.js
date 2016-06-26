'use strict';

var mongoose = require('mongoose');

let newUserSchema = new mongoose.Schema({
  // fill here
});

User collection:
- UserID
- Email
- Password
- PasswordChangeToken
- UserGroup


module.exports = mongoose.model("newUser", newUserSchema)
