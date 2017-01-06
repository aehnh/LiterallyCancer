var express = require('express');
var router = express.Router();
var http = require('http').Server(express());
var io = require('socket.io')(http);
var Canvas = require('../models/canvas');

/* create canvas */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var canvas = new Canvas();
  var path = require('path');
  //res.sendFile(path.resolve('index.html'));
  canvas.save();

  res.render(path.resolve('index'), {id: canvas._id, isCreated: true}, function (err, html) {
      //console.log(html);
      console.log(err);
      res.send(html);
  });
});

router.get('/:id', function (req, res) {
    Canvas.findById(id, function (err, canvas) {
        if (err) console.error('error');
        if(!canvas) {
          console.error('no such canvas');
        } else {
            res.render(path.resolve('index'), {snapshotJSON: canvas.snapshotJSON, isCreated: false}, function (err, html) {
                res.send(html);
            })
        }
    });
});

module.exports = router;
