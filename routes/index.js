var express = require('express');
var router = express.Router();
var http = require('http').Server(express());
var io = require('socket.io')(http);
var Canvas = require('../models/canvas');

/* create canvas into all */
router.get('/new', function(req, res, next) {
  var path = require('path');
  var canvas = new Canvas();
  canvas.save();
  res.render(path.resolve('index'), {id: canvas._id, isCreation: true, isUser: false}, function (err, html) {
    //console.log(html);
    console.log(err);
    res.send(html);
  });
});

// create canvas of one user
router.get('/newToUser/:facebookID', function(req, res) {
    console.log('logged in with ' + req.params.facebookID);
    var path = require('path');
    var canvas = new Canvas();
    canvas.whose = req.params.facebookID;
    canvas.save();
    res.render(path.resolve('index'), {id: canvas._id, isCreation: true, isUser: true, whose: req.params.facebookID}, function (err, html) {
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
              title: canvas.title,
              snapshotJSON: canvas.snapshotJSON,
              isCreation: false
          }, function (err, html) {
              res.send(html);
          })
      }
  });
});

router.get('/', function(req, res) {
    res.redirect('/dev/home');
});

router.get('/dev/home', function(req, res) {
    Canvas.find({}, function (err, canvasList) {
        console.log('not logged in.');
        var path = require('path');
        res.render(path.resolve('home'), {canvasList: canvasList}, function (err, html) {
            //console.log(html);
            console.log(err);
            res.send(html);
        });
    });
});
router.get('/home/:facebookID/:name', function(req, res) {
    Canvas.find({whose: req.params.facebookID}, function (err, canvasList) {
        var path = require('path');
        res.render(path.resolve('afterLogin'), {canvasList: canvasList, facebookID: req.params.facebookID, name: req.params.name}, function (err, html) {
            //console.log(html);
            console.log(err);
            res.send(html);
        });
    });
});

module.exports = router;
