const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const accounts = require('./routes/accounts');

const mongoose = require('mongoose');
const sessions = require('client-sessions');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/employeedir');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'External db connection error'));
db.once('open', function(callback) {
  console.log('Successfully opened external db in Mongo.');
});




// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sessions

app.use(sessions({
  cookieName: 'Employee',
  requestKey: 'SecretEmployee',
  secret: 'owijauhgiuhrgiu',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5,
}));


app.use('/', routes);
app.use('/u/', users);
app.use('/a/', accounts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
