var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/elm_server?retryWrites=true'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 设置 locals，只在开发环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 渲染出错页面
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
