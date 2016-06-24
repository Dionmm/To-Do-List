'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

let app = express();

//parse it into json files!
app.use(bodyParser.json());

//routers
let dbRouter = require('./routes/dbQuery.js');
//public folder
let publicPath = path.join(__dirname, "../public");

//share public content
app.use (express.static(publicPath));
app.use("/node_modules", express.static(path.join(__dirname,"../node_modules")));

//start angular app
app.get("/", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

//set up a route for db request
app.use("/data", dbRouter);

//start app
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
