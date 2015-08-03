const User = require('../models/User');
const express = require('express');
const router = express.Router();

/* register a user. */
router.post('/register', function(req, res, next) {
  new User(req.body).save(function(err) {
    if (err) {
      console.error('Error registering', err);
      res.render('register');
    } else {
      res.redirect('/');
    }
  });
});

/* login a user. Hash it and check it against the hashed password. */
router.post('/login', function(req, res, next) {
  console.log(req.body.username)
  User.findOne({username: req.body.username}).exec(function(err, object){
    console.log(object, err)
    console.log('ho', (err !== null && typeof err !== 'undefined'))
    console.log('ho2', object === null, typeof object === 'undefined')
    if((err !== null && typeof err !== 'undefined') || typeof object === 'undefined' || object === null) {
      console.log('there was an error finding a user')
      res.send(400, 'There was an error logging in')
      return
    }
    if(object.authenticate(req.body.password)) {
      console.log('woot')
      res.send(200, 'yay')
    }
    else {
      console.log('incorrect password')
      res.send(401, 'Incorrect password')
    }

  });
});

/* list  */
// router.get('/list', function(req, res, next) {
// });

// router.get('/')

module.exports = router;
