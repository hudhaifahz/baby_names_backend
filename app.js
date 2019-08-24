require('dotenv').config()
var express = require("express");
var port = process.env.PORT || 3000;
const db = require('./queries')
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", function (req, res) {
    res.send(JSON.stringify({Hello: port}));
});

app.get('/names', db.getNames);

app.listen(port, function(){
    console.log("Example app listening on port!");
});