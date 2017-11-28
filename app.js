var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongo = require('./mongo');

var indexmodel = require('./routes/index');
var quotemodel = require('./routes/quote');
var usermodel = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('port', 6565);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quotes', function(req, res){
  //res.send('test');
  mongoose.model('quote_table').find({}).exec(function(error, collection){
      res.send(collection);
  })
})

app.use('/', indexmodel);
// app.get('/', function(req, res) {
//   res.render('index', { user: 'req.user' });//TBD
// });
app.use('/quote', quotemodel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// mongo.connect(function (db) {
//   db.close();
//   app.listen(app.get('port'), function (req, res) {
//       console.log("Server Started On Port: " + app.get('port'));
//   });
// });


//mongoose.connect('mongodb://localhost:27017/mydb'); //For local db connection
mongoose.connect('mongodb://quoteuser:Monday1$@ds259105.mlab.com:59105/quotedb');

var con = mongoose.connection;
con.once('open', function(){
    console.log('connection to mongodb successfully!');
    usermodel.seedUsers();
    //quotemodel.seedQuotes();
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

//app.listen(process.env.PORT,process.env.IP);
//app.listen(process.env.PORT||3000);
// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});