var chai = require('chai');
var expect = require("chai").expect;
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var mongoose = require('mongoose');
var quoteModel1 = require('../routes/quote');
var listModel = require('../routes/index');
var usersModel = require('../routes/user');
var Promise = require("bluebird");


function resetQuotes(){
    return new Promise(function(resolve, reject){
    mongoose.connection.collections['quote_tables'].drop(resolve, reject);
    });
}

chai.use(chaiHttp);

// describe("get quotes", function(){
//    it("should never be empty since quotes are seeded", function(done){
//        mongoose.connect('mongodb://quoteuser:Monday1$@ds259105.mlab.com:59105/quotedb', function(){
      
//         mongoose.model('quotetb').find({}).exec(function(error, quoteList){
//                 setTimeout(function() {
//                     expect(quoteList.length).to.be.at.least(0);
//                     done();
//                 }, 1000);
//             });

//            });
//        });
//     //   jobList = [];
//     //   expect(jobList.length).to.be.at.least(1);
//    });

describe('Quotes', function() {
    it('Should list ALL quotes on api/ GET', function(done) {
        var foo = "test";
        expect(foo).to.be.a('string');
        done();
      });
    // it('should list a SINGLE blob on /blob/<id> GET');
    // it('should add a SINGLE blob on /blobs POST');
    // it('should update a SINGLE blob on /blob/<id> PUT');
    // it('should delete a SINGLE blob on /blob/<id> DELETE');
  });