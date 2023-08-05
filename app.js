const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const insertVRouter = require('./routes/insertV');
const insertSRouter = require('./routes/insertS');
const selectVRouter = require('./routes/selectV');
const updateVRouter = require('./routes/updateV');
const selectSuspRouter = require('./routes/selectSusp');
const selectURouter = require('./routes/selectU');
const selectSRouter = require('./routes/selectS');
const updateSRouter = require('./routes/updateS');
const selectImageVRouter = require('./routes/selectImageV');
const selectImageSRouter = require('./routes/selectImageS');
const app = express();
dotenv.config();
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
