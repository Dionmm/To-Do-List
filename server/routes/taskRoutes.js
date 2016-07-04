'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var Task = require("../Model/Task");
var User = require("../Model/User");

let router = express.Router();

// ========================================== PARSING REQUEST BODY ======================================================
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
      if(err){
        return res.json({err:err});
      } else{
        req.decoded = decoded;
        next();
      }
    });
  } else{
    req.decoded = {id: "1"}; //String because mongoDB autoindex generates a hexadecimal number as string
    next();
  }
});

// ========================================== GET ======================================================
router.get("/", function(req, res){
  //return every task
  Task.find({ UserID: req.decoded.id }, function (err, data) {
    if(err){
      res.status(500).json({"err": err})
    }else{
      res.json(data);
    }
  });
});
// ========================================== POST ======================================================
router.post("/", function (req, res) {
  var newTask =  new Task({
    UserID: req.decoded.id,
    Status: false,
    Priority: req.body.Priority.toLowerCase(),
    Desc: req.body.Desc,
    Xcoord: req.body.Xcoord,
    Ycoord: req.body.Ycoord,
    DateCreated: new Date()
  });

  newTask.save(function (err) {
    if(err){
      res.status(500).json({"err": err});
    } else{
      console.log("SAVED Task ID " + newTask._id);
      res.status(200).json({"_id": newTask._id});
    }
  })
});


// ========================================== PUT (UPDATE) ======================================================
router.put("/:task_id", function(req, res){

  Task.findById(req.params.task_id, function(err, task){
    if(err){
      res.status(500).json({"err": err});
    } else{
      if(task.UserID === req.decoded.id){
        task.Status = req.body.Status;
        task.Priority = req.body.Priority.toLowerCase();
        task.Desc = req.body.Desc;
        task.Xcoord = req.body.Xcoord;
        task.Ycoord = req.body.Ycoord;

        task.save(function(err){
          if(err){
            res.status(500).json({"err": err});
          } else{
            res.status(200).end();
          }
        });
      } else{
        res.status(403).json({err: "User does not have permission to edit this task", d: req.decoded.id, i:task.UserID});
      }
    }
  });
});

// ========================================== DELETE ======================================================
router.delete("/:task_id", function(req, res){

  Task.findById(req.params.task_id, function(err, task){
    if(err){
      res.status(500).json({"err": err});
    } else{
      if(task.UserID === req.decoded.id){
        Task.remove({ _id: req.params.task_id}, function(err){
          if(err){
            res.status(500).json({"err": err});
          } else{
            res.status(200).end();
          }
        });
      } else{
        res.status(403).json({err: "User does not have permission to delete this task"});
      }
    }
  });


});

//Error handling
router.use(function (req, res) {
  res.send("<div style='text-align: center'><h1 style='margin: 0 auto'>Sorry!</h1><h2>Couldn't find that!</h2><h3><a href='/'>Go back</a></div>");
});


module.exports = router;
