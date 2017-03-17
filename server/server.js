var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./workers/openDataCaller');
var getLatLng = require('./mapsHelper');
var getCrimeLocs = require('./heatmapUtils')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.post('/search', function(req, res) {
  getLatLng(req.body.address, function(location) {
    res.send(location);
  });
});

app.get('/heatmapData', function(req, res) {
  getCrimeLocs(function(locations) {
    res.send(locations)
  })
})

app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;