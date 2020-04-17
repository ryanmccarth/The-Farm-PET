var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsonErrorHandler = require('express-json-error-handler');

var authRouter = require('./routes/auth');
<<<<<<< Updated upstream
var requestsRouter = require('./routes/requests');
=======
var usersRouter = require('./routes/users');
>>>>>>> Stashed changes

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
<<<<<<< Updated upstream
app.use('/api/requests', authRouter);
=======
app.use('/api/users', usersRouter);
>>>>>>> Stashed changes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// handle errors by logging them and sending a JSON object to the client with error information
app.use(jsonErrorHandler.default({
  log({err, req, res}) {
    console.log(err);
  }
}));

module.exports = app;
