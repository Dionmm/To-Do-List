'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

let router = express.Router();

//read a file and parse it to json format, then run next() to indicate that middleware has finished
router.use(function(req,res,next){
  req.db = {};
  req.db.data = fs.readFileSync(path.join(__dirname, "../tempDB/MOCK_DATA.json"), "UTF-8");
  req.db.data = JSON.parse(req.db.data);
  req.db.length = req.db.data.length;
  next();
})

//send back specified data entry
router.get("/:id", function(req, res){
  let id = req.params.id;
  if(id < 0 || id > req.db.length) {
    res.json({empty: null});
  }
  else {
    res.json(req.db.data[req.params.id]);
  }

});

//send all datas
router.get("/", function(req, res){
  res.json(req.db);
});


module.exports = router;
