var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var path = require('path');
var express = require('express');



/* GET home page. */
router.get('/create', function(req, res, next) {
	console.log("create Quote");
  	res.render('createQuote',{});
});
router.get('/update', function(req, res, next) {
	console.log("create Quote");
  	res.render('createQuote',{});
});

var quoteTbSchema = new mongoose.Schema({
	quote_id:{type:Number},
	quote_name:{type:String},
	date_requested:{type:Date},
	request_by_user:{type:String},
	valid_from:{type:Date},
	valid_to:{type:Date},
	product_to_buy:{type:String},
	product_requested_price:{type:Number},
	product_approved_price:{type:Number},
	comment:{type:String},
	created_by:{type:String},
	quote_status:{type:String},
	approved_date:{type:Date},
	token:{type:String}
});

var quotetb = mongoose.model('quote_table', quoteTbSchema);

// exports.seedQuotes = function(callback){
// 	quotetb.find({}).exec(function(error, collection){
// 		if(collection.length === 0){
// 			var date = new Date();
// 			var day  = date.getDate();
// 			var rowDoc =  {quote_id:1, quote_name:'First Sample Quote.', date_requested: day, request_by_user:'manoj', valid_from:day, valid_to:day, product_to_buy:'test', product_requested_price: 1.10, product_approved_price: 1.20, comment:'my comment', quote_status: 'Approved', approved_date: day, token:'adhlajdadasjld' };
// 			quotetb.create(rowDoc, callback);
// 		}
// 	})
//   }

router.post('/create', function(req, res, next) {
	var qname = req.body.qname;
	var qproduct = req.body.qproduct;
	var qprice = req.body.qprice;

	
	var day  = Date.now();
	var quoteidunique = Date.now();

	//seedQuotes();
	//var doc = {"qname" : qname, "qproduct" : qproduct, "qprice" : qprice};
	//var rowDoc =  {"quote_id":'1', "quote_name":qname,  "request_by_user":'manoj', "product_to_buy":qproduct, product_requested_price: qprice };
	var rowDoc =  {quote_id:quoteidunique, quote_name:qname, date_requested: day, request_by_user:'manoj', valid_from:day, valid_to:day, product_to_buy:qproduct, product_requested_price: qprice, product_approved_price: 0, comment:'my comment', quote_status: 'Submit', approved_date: day, token:'' };
	
	quotetb.create(rowDoc, function(err, team) { 
		var strOutput; 
		res.writeHead(200, { 
		  'Content-Type': 'text/plain'
		}); 
		if (err) { 
		  console.log(err); 
		  strOutput = 'Oh problem, we\'ve got an error'+ err; 
		} else { 
		  console.log('Team created: ' + team); 
		  //strOutput = team.Country + ' created in Group ' + team.GroupName + '\nat ' + team.CreatedOn; 
		  strOutput = 'Successfully submitted.';
		} 
		res.write(strOutput); 
		res.end(); 
	  }); 
	
});

router.post('/update', function(req, res, next) {
	var qid = req.body.qid;
	var qname = req.body.qname;
	var qproduct = req.body.qproduct;
	var qprice = req.body.qprice;

	
	var day  = Date.now();
	var quoteidunique = Date.now();

	quotetb.findOneAndUpdate({
		   deviceId:qid,
			},{$set:{quote_name:qname,product_to_buy:qproduct,product_requested_price:qprice}},function(err, user) {
	
		var strOutput; 
		res.writeHead(200, { 
		  'Content-Type': 'text/plain'
		}); 
		if (err) { 
		  console.log(err); 
		  strOutput = 'Oh problem, we\'ve got an error'+ err; 
		} else { 
		  console.log('Team created: ' + team); 
		  strOutput = team.Country + ' created in Group ' + team.GroupName + '\nat ' + team.CreatedOn; 
		  strOutput = 'Successfully submitted.';
		} 
		res.write(strOutput); 
		res.end(); 
	  }); 
	
});

module.exports = router;
