var express = require('express');
var router = express.Router();
var path = require('path');
var mongo = require('../mongo');

/* GET home page. */
router.get('/create', function(req, res, next) {
	console.log("create Quote");
  	res.render('createQuote',{});
});

router.post('/create', function(req, res, next) {
	var qname = req.body.qname;
	var qproduct = req.body.qproduct;
	var qprice = req.body.qprice;

	var doc = {"qname" : qname, "qproduct" : qproduct, "qprice" : qprice};

	mongo.connect(function (db) {
	  // db.close();
	  mongo.insertDocument(db, doc, function(result) {
	  	console.log("inserted Successfully");
	  	res.send("ok");
	  })
	});
	
});

module.exports = router;
