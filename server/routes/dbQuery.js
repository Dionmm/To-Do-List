'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require("lodash");
var bodyParser = require("body-parser");

let router = express.Router();

// router.use(bodyParser.json());  // to support url-encoded stuff ex. name=foo&color=red

//read a file and parse it to json format, then run next() to indicate that middleware has finished
router.use(function(req,res,next){
  req.db = {};
  req.db.data = fs.readFileSync(path.join(__dirname, "../tempDB/MOCK_DATA.json"), "UTF-8");
  req.db.data = JSON.parse(req.db.data);
  req.db.length = req.db.data.length;
  next();
})


router.get("/", function(req, res){

  //check if query object is empty (no parameters has been send). If yes, send whole db
  if(_.isEmpty(req.query)) {res.json(req.db.data)}
  else { // else, complete query
    let id = req.query.id;
    if(id < 0 || id > req.db.length) {
      res.json({empty: null});
    }
    else {
      res.json(req.db.data[id]);
    }
  }

});

//send all datas



module.exports = router;
