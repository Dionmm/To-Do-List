'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

let app = express();
let dbUrl = 'mongodb://orangeBees:Honey68@ds023654.mlab.com:23654/to-do-list';

//DB Connection
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("We're in boss, what now?");
})
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
app.use("/load", dbRouter);

//start app
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
