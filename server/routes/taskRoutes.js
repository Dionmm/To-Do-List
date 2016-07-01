'use strict';

var express = require('express');
var path = require('path');
var _ = require("lodash");
var bodyParser = require("body-parser");
var Task = require("../Model/Task");

let router = express.Router();

// ========================================== PARSING REQUEST BODY ======================================================
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// ========================================== GET ======================================================
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
// ========================================== POST ======================================================
router.post("/", function (req, res) {
  var newTask =  new Task({
    UserID: req.body.UserID,
    Status: req.body.Status,
    Priority: req.body.Priority.toLowerCase(),
    Desc: req.body.Desc,
    Xcoord: req.body.Xcoord,
    Ycoord: req.body.Ycoord,
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


// ========================================== PUT (UPDATE) ======================================================
router.put("/:task_id", function(req, res){
  Task.update({ _id: req.params.task_id}, {
    Status: req.body.Status,
    Priority: req.body.Priority.toLowerCase(),
    Desc: req.body.Desc,
    Xcoord: req.body.Xcoord,
    Ycoord: req.body.Ycoord
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

// ========================================== DELETE ======================================================
router.delete("/:task_id", function(req, res){
  Task.remove({ _id: req.params.task_id}, function(err){
    if(err){
      console.error(err.message)
      res.status(500).json({"err": err});
    } else{
      res.status(200).end();
    }
  });
});


module.exports = router;
