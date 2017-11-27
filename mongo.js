var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mydb';

// Use connect method to connect to the Server
var connect = function (cb) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MondoDB");
        cb(db);
    });
};

var insertDocument = function(db, doc, callback) {
  // Get the documents collection
  var collection = db.collection('quotes');
  // Insert some documents
  collection.insertOne(doc, function(err, result) {
	    assert.equal(err, null);
	    console.log("Inserted a document into the quotes collection.");
	    callback(result);
	});
}

exports.connect = connect;
exports.insertDocument = insertDocument;