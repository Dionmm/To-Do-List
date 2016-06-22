'use strict';

var express = require('express');
var app = express();
var path = require('path');

let teamList = {
  "Project_manager": " __Kenneth",
  "Frontend": [
    "albertukaz",
     "edwardj"
   ],
  "Backend": [
    "Krizzu",
    "anOrphanedPlatypus"
  ]
};

//add static files to be used
app.use(express.static(path.join(__dirname,'../samplePage')));

//send json file
app.get('/users', function(req, res, next){
  res.json(teamList);
});

app.get('/', function (req,res) {
  res.sendFile(path.join(__dirname,'../samplePage/index.html'))
  res.end();
});


//start app
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
