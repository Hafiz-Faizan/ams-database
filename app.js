var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRoutes = require('./routes/admin');
var teacherRoutes = require('./routes/teacher');
var attendanceRoutes = require('./routes/attendance');
var feesRoutes = require('./routes/Fees');
var reportRoutes = require('./routes/report');
var clasSectionRoutes=require('./routes/classes&section');
var studentRoutes=require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRoutes);
app.use('/api', teacherRoutes);
app.use('/', attendanceRoutes);
app.use('/student', studentRoutes);
app.use('/api', feesRoutes);
app.use('',clasSectionRoutes);
app.use('',reportRoutes);


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

const port = process.env.PORT || 3000; // Use the PORT environment variable if set, otherwise use port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
