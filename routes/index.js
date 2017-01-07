var express = require('express');
var router = express.Router();
var http = require('http').Server(express());
var io = require('socket.io')(http);
var Canvas = require('../models/canvas');

/* create canvas */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var path = require('path');
  var canvas = new Canvas();
  canvas.save();
  res.render(path.resolve('index'), {id: canvas._id, isCreation: true}, function (err, html) {
    //console.log(html);
    console.log(err);
    res.send(html);
  });
});

router.get('/:id', function (req, res) {
  Canvas.findById(req.params.id, function (err, canvas) {
    var path = require('path');
    if (err) console.error('error');
    if(!canvas) {
      console.error('no such canvas');
    } else {
      res.render(path.resolve('index'), {
        id: req.params.id,
        snapshotJSON: canvas.snapshotJSON,
        isCreation: false
      }, function (err, html) {
        res.send(html);
      })
    }
  });
});

module.exports = router;
