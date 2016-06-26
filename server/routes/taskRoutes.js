'use strict';

var express = require('express');
var path = require('path');
var _ = require("lodash");
var bodyParser = require("body-parser");
var Task = require("../Model/Task");

let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

// let taskSchema = new mongoose.Schema({
//   "UserID": { type: String, required: true },
//   "TaskID": { type: String, required: true },
//   "Status": { type: Boolean, required: true },
//   "Priority": { type: String, required: true },
//   "Desc": { type: String, required: true },
//   "Xcoord": { type: Number, required: true },
//   "Ycoord": { type: Number, required: true }
// });


router.get("/", function(req, res){
  //return every task
  Task.find({}, function (err, data) {
    if(err){
      console.error(err);
      res.status(500).json({"err": err})
    }else{
      res.json(data);
    }
  });
});

router.post("/add", function (req, res) {

  var newTask =  new Task({
    UserID: req.body.UserID,
    Status: req.body.Status,
    Priority: req.body.Priority.toLowerCase(),
    Desc: req.body.Desc,
    Xcoord: req.body.XCoord,
    Ycoord: req.body.YCoord,
    DateCreated: new Date()
  });

  newTask.save(function (err, result) {
    if(err){
      console.error(err.message)
      res.status(500).json({"err": err});
    } else{
      console.log("SAVED Task ID " + newTask._id);
      console.log(result);
      res.status(200).end();
    }
  })
});

router.post("/edit", function(req, res){
  Task.update({ _id: req.body.TaskID}, {
    Status: req.body.Status,
    Priority: req.body.Priority.toLowerCase(),
    Desc: req.body.Desc,
    Xcoord: req.body.XCoord,
    Ycoord: req.body.YCoord
  },
  {runValidators: true},
  function(err, task){
    if(err){
      console.error(err.message)
      res.status(500).json({"err": err});
    } else{
      console.log(task);
      res.status(200).end();
    }
  });
});

router.post("/delete", function(req, res){
  Task.remove({ _id: req.body.TaskID}, function(err){
    if(err){
      console.error(err.message)
      res.status(500).json({"err": err});
    } else{
      res.status(200).end();
    }
  });
});


module.exports = router;
