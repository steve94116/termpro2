const express = require('express');
const router = express.Router();
const db = require('../conf/database');
var path = require('path');


router.get('/getAllUsers', (req, res, next) =>{
    db.query('SELECT * from users;', (err, results, fields) =>
  {
    if(err){
      next(err);
    }
    console.log(results);
    res.send(results);
  })
});

router.get('/getAllPosts', (req, res, next) =>{
    db.query('SELECT * from posts;', (err, results, fields) =>
  {
    if(err){
      next(err);
    }
    console.log(results);
    res.send(results);
  })
  .catch((err) => {
    next(err);
  })
});

router.get('/getAllPostsP', (req, res, next) =>{
    db.query('SELECT * from posts;')
    .then(([results, fields]) => {
      console.log(results);
      res.send(results);
    })
});
/*<form action = "dbtest/createUser" method="POST"
enctype="x-www-form-urlencoded">
  <input id = "password" name="password" />
<input id="username" name="username" />
<input id ="email" name="email" />
<input id="button" name ="button" />
</form> */

router.post('/createUser', (req, res, next) => {
  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  //validate date, if bad send back response
  //res.redirect('/registration');


 let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
   db.query(baseSQL, [username, email, password]).
   then(([results, fields]) => {
      if(results && results.affectedRows) {
        // res.send('user was not made ford some reason');
        res.redirect("/userLogin")
      }else{
        res.send('user was not made for some reason');
      }
  })
  .catch((err) => {
    var err = new Error('user was not made for some reason');
    err.status = 500;   
     next(err);
  })
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  baseSQL = 'SELECT * FROM users where username = ? and password = ?';
  db.query(baseSQL, [username, password]).
  then(([results, fields]) => {
    if(results.length > 0) {
      res.sendFile(path.join(__dirname + '/../public/index.html'));
  } else {
    throw new Error('user unauthorized')
    res.send('user unauthorized'); 
     
  }
  })
  .catch((err) =>{
    var err = new Error('Incorrect_Credential');
    err.status = 401;  
    next(err)
  })
})

module.exports = router;
