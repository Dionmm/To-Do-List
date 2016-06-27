'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

let app = express();

// ========================================== VARIABLES ======================================================
let dbUrl = 'mongodb://orangeBees:Honey68@ds023654.mlab.com:23654/to-do-list'; //db address to connect
let publicPath = path.join(__dirname, "../public"); //public folder location


// ========================================== DB CONNECTION ======================================================
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("We're in boss, what now?");
});

// ========================================== ROUTERS ======================================================
let taskRouter = require('./routes/taskRoutes.js');
let userRouter = require('./routes/userRoutes.js');



// ========================================== SHARING PUBLIC CONTENT ======================================================
app.use (express.static(publicPath));
app.use("/node_modules", express.static(path.join(__dirname,"../node_modules")));


// ========================================== ROUTING HANDLING ======================================================
app.use("/task", taskRouter);
//app.use("/user", userRouter); <-- time to create this one!


// ========================================== STARTING APP ======================================================
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
