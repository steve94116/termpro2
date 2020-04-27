var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dbtest',dbRouter);
app.use('/users', usersRouter);

// app.use((err, req, res, next) => { /
//   res.status(500);
//   res.send('something with wrong with your db');
// })


app.use((err, req, res, next) => {
  
  if(err.status == 500 && err.message == 'user was not made for some reason'){
    res.redirect("/registration?error=" + encodeURIComponent('Incorrect_User'))
  }
  else if (err.status == 401 && err.message == 'Incorrect_Credential'){
    res.redirect("/userLogin?error=" + encodeURIComponent('Incorrect_Credential'));
  }
  else {
    res.status(500);
    res.send('something with wrong with your db');
  }
  
})
module.exports = app;
