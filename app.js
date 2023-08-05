var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const formData = require('express-form-data');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertVRouter = require('./routes/insertV');
var insertSRouter = require('./routes/insertS');
var selectVRouter = require('./routes/selectV');
var updateVRouter = require('./routes/updateV');
var selectSuspRouter = require('./routes/selectSusp');
var selectURouter = require('./routes/selectU');
var selectSRouter = require('./routes/selectS');
var updateSRouter = require('./routes/updateS');
var selectImageVRouter = require('./routes/selectImageV');
var selectImageSRouter = require('./routes/selectImageS');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insertV', insertVRouter);
app.use('/insertS', insertSRouter);
app.use('/selectV', selectVRouter);
app.use('/selectSusp', selectSuspRouter);
app.use('/selectS', selectSRouter);
app.use('/selectU', selectURouter);
app.use('/updateV/', updateVRouter);
app.use('/updateS/', updateSRouter);
app.use('/selectImageV', selectImageVRouter);
app.use('/selectImageS', selectImageSRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const port = process.env.PORT || 4000; // Use a variável de ambiente PORT se estiver definida, caso contrário, use 4000 como valor padrão.

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;
