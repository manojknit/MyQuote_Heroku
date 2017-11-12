var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function(){
  Job.find({}).exec(function(error, collection){
      if(collection.length === 0){
          Job.create({title:'Cook', description:'You will be cooking food.'});
          Job.create({title:'Driver', description:'You will be driving car.'});
          Job.create({title:'Developer', description:'You will be developing site.'});
          Job.create({title:'DBA', description:'You will be doing dba work.'});
      }
  })
}