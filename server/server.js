'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var config = require('./config');

let app = express();

// ========================================== VARIABLES ======================================================
let dbUrl =  config.database;//db address to connect
let publicPath = path.join(__dirname, "../public"); //public folder location


// ========================================== DB CONNECTION ======================================================
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("We're in boss, what now?");
});
app.set('superSecret', config.secret);

// ========================================== ROUTERS ======================================================
let taskRouter = require('./routes/taskRoutes.js');
let userRouter = require('./routes/userRoutes.js');


// ========================================== SHARING PUBLIC CONTENT ======================================================
app.use (express.static(publicPath));
app.use("/node_modules", express.static(path.join(__dirname,"../node_modules")));


// ========================================== ROUTING HANDLING ======================================================
app.use("/task", taskRouter);
app.use("/user", userRouter);

// ERROR 404
app.use(function (req, res) {
  res.send("<div style='text-align: center'><h1 style='margin: 0 auto'>Sorry!</h1><h2>Couldn't find that!</h2><h3><a href='/'>Go back</a></div>");
});


// ========================================== STARTING APP ======================================================
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
