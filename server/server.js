'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var tasks = 
        [
            {
                "TaskID": "1234567",
                "Status": 1,
                "Priority": "High",
                "Text": "Clean the dishes",
                "UserID": "Dion",
                "XCoord": 55,
                "YCoord": 67,
                "DateCreated": new Date(16,6,23)
            },
            {
                "TaskID": "7654321",
                "Status": 0,
                "Priority": "Med",
                "Text": "Walk the dog",
                "UserID": "Dion",
                "XCoord": 78,
                "YCoord": 60,
                "DateCreated": new Date(16,6,22)
            },
            {
                "TaskID": "5671234",
                "Status": 1,
                "Priority": "low",
                "Text": "Get some groceries",
                "UserID": "Dion",
                "XCoord": 100,
                "YCoord": 99,
                "DateCreated": new Date(16,6,18)
            },
        ];


let publicPath = path.join(__dirname, "../public");

app.use (express.static(publicPath));
app.use("/node_modules", express.static(path.join(__dirname,"../node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

//Initial load of all tasks
app.get("/load", function(req, res){
	res.json(tasks);
});

//Adding task
app.post("/add", function(req, res){
	addTask(req.body);
	res.redirect('/');
});

//Editing task
app.post("/edit", function(req, res){

});

//Deleting task
app.post("/delete", function(req, res){

});

//Adding user
app.post("/register", function(req, res){

});

//Logging in user
app.post("/login", function(req, res){

});

//start app
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

function addTask(data){
	var newTask = {};
	newTask["TaskID"] = Math.floor(Math.random() * (9999999-1111111) + 1111111);
	newTask["Status"] = data.status;
	newTask["Priority"] = data.Priority;
	newTask["Text"] = data.Text;
	newTask["UserID"] = "Dion";
	newTask["XCoord"] = 23;
	newTask["YCoord"] = 58;
	newTask["DateCreated"] = new Date();

	tasks.push(newTask);

}
