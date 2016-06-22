var express = require('express');
var app = express();

//Serve static files
app.use(express.static('public'));
app.use("/node_modules", express.static('node_modules'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
