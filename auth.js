module.exports = function(req, res, next) {
  if (req.loggedIn) {
    next();
  }
  else {
  // if there is no valid user in the session, then we should clear the session
  // and return them to login page
    req.SecretEmployee.reset()
    res.redirect('/a/login');
  }
};


