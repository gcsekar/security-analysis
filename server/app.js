var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieSession = require('cookie-session');
//var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var stocktwits = require('./routes/stocktwits');
var scrape = require('./routes/scrape');
var app = express();
var token = "";
var profile;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(app.router);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(expressSession({secret:"5ec7et", resave: true, saveUninitialized:
// true}));
app.use(cookieSession({
	  key: 'app.sess',
	  secret: 'SUPERsekret',
	  maxAge: 24 * 60 * 60 * 1000 // 24 hours
	}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/stocktwits', stocktwits);
app.use('/scrape', scrape);

app.use(function(req,res,next){
	console.log(req.session.token);
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.path);
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

module.exports = app;
