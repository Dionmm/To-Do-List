'use strict';

var express = require('express');
var path = require('path');
var _ = require("lodash");
var bodyParser = require("body-parser");
var Task = require("../Model/Task");

let router = express.Router();

router.use(bodyParser());

// let taskSchema = new mongoose.Schema({
//   "UserID": { type: String, required: true },
//   "TaskID": { type: String, required: true },
//   "Status": { type: Boolean, required: true },
//   "Priority": { type: String, required: true },
//   "Description": { type: String, required: true },
//   "Xcoord": { type: Number, required: true },
//   "Ycoord": { type: Number, required: true }
// });


router.get("/", function(req, res){
  //return every task
  Task.find({}, function (err, data) {
    if(err) throw err;

    console.log(data);
    res.redirect('/');
  });

});

router.post("/add", function (req, res) {

  let newTask = Task({
    UserID: req.body.UserID,
    TaskID: req.body.TaskID,
    Status: req.body.Status,
    Priority: req.body.Priority,
    Description: req.body.Description,
    Xcoord: req.body.XCoord,
    Ycoord: req.body.YCoord,
  });

  newTask.save(function (err) {
    if(err) throw err;
    console.log("SAVED Task ID"+ newTask._id);
  })
  res.redirect("/");
});





module.exports = router;
