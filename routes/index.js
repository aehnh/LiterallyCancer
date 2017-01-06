var express = require('express');
var router = express.Router();
var http = require('http').Server(express());
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var path = require('path');
  res.sendFile(path.resolve('index.html'));
  io.on('connection', function (socket) {
      console.log('a user connected');
  })
});

module.exports = router;
