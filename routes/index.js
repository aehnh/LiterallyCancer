var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var path = require('path');
  res.sendFile(path.resolve('index.html'));
});

module.exports = router;
