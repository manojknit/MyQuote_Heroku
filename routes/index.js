var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.renderFile(path.join(__dirname, '..', 'public', 'index.html'));
  // res.send("<html><head></head><body><p>Hello</p></body></html>");
  res.render('index',{});
});

module.exports = router;
