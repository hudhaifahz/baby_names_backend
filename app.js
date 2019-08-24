require('dotenv').config()
var express = require("express");
var port = process.env.PORT || 3000;
const db = require('./queries')
var app = express();

app.configure(function () {
    app.use(allowCrossDomain);
});

app.get("/", function (req, res) {
    res.send(JSON.stringify({Hello: port}));
});

app.get('/names', db.getNames);

app.listen(port, function(){
    console.log("Example app listening on port!");
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};