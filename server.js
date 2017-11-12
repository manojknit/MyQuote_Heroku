var express = require('express');
var mongoose = require('mongoose');
var jobModel1 = require('./models/Job');

var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname+'/public'));

app.get('/api/jobs', function(req, res){
    //res.send('test');
    mongoose.model('Job').find({}).exec(function(error, collection){
        res.send(collection);
    })
})

app.get('*', function(req, res){
    res.render('index');
})

//mongoose.connect('mongodb://localhost/jobfinder');
mongoose.connect('mongodb://quoteuser:Monday1$@ds259105.mlab.com:59105/quotedb');

var con = mongoose.connection;
con.once('open', function(){
    console.log('connection to mongodb successfully!');
    jobModel1.seedJobs();
});

app.listen(process.env.PORT,process.env.IP);