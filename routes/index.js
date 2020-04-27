var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/registration', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/registration.html'));
});

router.get('/userLogin', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/login.html'));
});

module.exports = router;
//gfdg