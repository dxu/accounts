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

/* login a user . */
router.post('/login', function(req, res, next) {
});

/* list  */
// router.get('/list', function(req, res, next) {
// });

// router.get('/')

module.exports = router;
