var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
//var apiCall = require('./workers/openDataCaller');
var utils = require('./utils')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', function(req, res) {
  utils.getCrimeLocs(function(locations) {
    res.send(locations);
  });
});

// return number of crimes that happened and crime rating 
// [[[-122.41236300000003, 37.7868476], [-122.41236300000003, 37.7868476], {street: 'Market St', counter: 5, rating: 'red'}], [], [], []]
app.post('/ratings', function(req, res) {
  utils.convertDirectionsToStreet(req, function(err, response) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.send(JSON.stringify(response));
    }
  });
});

app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;
