var mongoose = require("mongoose");


var userTbSchema = new mongoose.Schema({
	user_id:{type:String},
	ad_user_id:{type:String},
	email_id:{type:String},
	role:{type:String}
});

var usertb = mongoose.model('user_table', userTbSchema);

exports.seedUsers = function(callback){
	usertb.find({}).exec(function(error, collection){
		if(collection.length === 0){
			usertb.create({user_id:'manoj', ad_user_id:'manoj.kumar@cloudjibe.com', email_id:'manojsjsu@gmail.com', role:'sales' });
            usertb.create({user_id:'manoj', ad_user_id:'manoj.kumar@cloudjibe.com', email_id:'manojsjsu@gmail.com', role:'pm' });
            usertb.create({user_id:'vidhi', ad_user_id:'vidhi@cloudjibe.com', email_id:'vidhi.sharma@sjsu.edu', role:'sales' });
			usertb.create({user_id:'vidhi', ad_user_id:'vidhi@cloudjibe.com', email_id:'vidhi.sharma@sjsu.edu', role:'pm' });
            usertb.create({user_id:'barkha', ad_user_id:'barkha@cloudjibe.com', email_id:'barkha.choithani@sjsu.edu', role:'sales' });
            usertb.create({user_id:'barkha', ad_user_id:'barkha@cloudjibe.com', email_id:'barkha.choithani@sjsu.edu', role:'pm' }, callback);
            
		}
	})
  }