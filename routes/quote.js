var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var path = require('path');
var express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZYgNyvwglKw28PSu8FeTverMkzgHkAW-qOpBouX' + '2uSYbsODYseW2NwkKBJJHay-VVhZqEPZX5K8QT9L',
    'client_secret': 'EPdWvwoixkNttCBR2ZiMS01Vo0G6X9gyHMLQtf' + 'Lgd05JyKvMDqJ_OKl4odTB8uI7mYpUPViSl4FbAtVu'
});


/* GET home page. */
// router.get('/create', function(req, res, next) {
// 	console.log("create Quote");
//   	res.render('createQuote',{});
// });
// router.get('/update', function(req, res, next) {
// 	console.log("create Quote");
//   	res.render('createQuote',{});
// });

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
		  //console.log('Team created: ' + team); 
		 // strOutput = team.Country + ' created in Group ' + team.GroupName + '\nat ' + team.CreatedOn; 
		  strOutput = 'Successfully updated.';
		} 
		res.write(strOutput); 
		res.end(); 
	  }); 
	
});

router.post('/pay', function(req, res, next) {
	var approvedPrice = req.body.approvedprice;
	const create_payment_json = {
		"intent": "sale",
		"payer": {
				"payment_method": "paypal"
		},
		"redirect_urls": {
				"return_url": "http://localhost:3000/success",
				"cancel_url": "http://localhost:3000/cancel"
		},
		"transactions": [{
				"item_list": {
						"items": [{
								"name": "Book",
								"sku": "001",
								"price": approvedPrice,
								"currency": "USD",
								"quantity": 1
						}]
				},
				"amount": {
						"currency": "USD",
						"total": approvedPrice
				},
				"description": "Payment"
		}]
	};

	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
				throw error;
		} else {
				for(let i=0;i<payment.links.length;i++){
						if(payment.links[i].rel==='approval_url'){
								res.redirect(payment.links[i].href);

						}
				}
		}
	});
});

router.get('/success',(req,res) => {
	const payerId = req.query.PayerID;
	const paymentId =req.query.paymentId;

	const execute_payment_json = {
			"payer_id": payerId,
			"transactions": [{
					"amount": {
							"currency": "USD",
							"total": "25.00"
					}
			}]
	};
	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
			if (error) {
					console.log(error.response);
					throw error;
			} else {

					console.log(JSON.stringify(payment));
					res.send('Success');
			}
	});
});
module.exports = router;
