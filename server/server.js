'use strict';

var express = require('express');
var app = express();
var path = require('path');

let publicPath = path.join(__dirname, "../public");

app.use (express.static(publicPath));

app.get("/", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

//start app
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
