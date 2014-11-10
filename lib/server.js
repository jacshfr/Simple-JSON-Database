'use strict';

var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var app = express();

var port = 2000;

app.post('/json/:name', jsonParser, function(req, res) {
  var name = req.params.name;
  var obj = JSON.stringify({someName: name});
  fs.writeFile('db/' + name + '.json', obj, function(err) {
    if (err) {
      console.log('there has been an error');
    } else {
      console.log(name + '.json has been written');
      res.send('file written');
    }
  });
});

app.get('/json/:name', jsonParser, function(req, res) {
  var name = req.params.name;
  console.log('param ' + name);
  fs.readFile('db/' + name + '.json', function(err, data) {
    if (err) {
      console.log('there has been an error');
      res.send('no file by that name');
    } else {
      res.send(data.toString());
    }
  });
});

app.listen(port, function() {
  console.log('listening');
});

// module.exports = app;
