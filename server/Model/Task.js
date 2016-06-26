'use strict';

var mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
  "UserID": { type: String, required: true },
  "Status": { type: Boolean, required: true },
  "Priority": { 
  	type: String, 
  	required: true,
  	validate: {
  		validator: function(v){
  			return /high|low|medium/i.test(v);
  		},
  		message: '{VALUE} is not a valid priority'
  	}
  },
  "Desc": { type: String, required: true },
  "Xcoord": { type: Number, required: true },
  "Ycoord": { type: Number, required: true }
});

// taskSchema.methods.methodName = function(arg1){
//   //do something here
//   //like Status check, or priority check
// };

module.exports = mongoose.model("Task", taskSchema)
