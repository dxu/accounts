const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    unique: true,
  },
  hashed_password: String,
  salt: String,
});

User.methods.makeSalt = function makeSalt() {
  return Math.round(new Date().valueOf() * Math.random());
};

User.methods.encryptPassword = function encryptPassword(password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
};

User.methods.authenticate = function authenticate(plainPass) {
  return this.encryptPassword(plainPass) === this.hashed_password;
};

User.virtual('password')
  .get(function() {
    return this.hashed_password;
  })
  .set(function(password) {
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  });

module.exports = mongoose.model('User', User);
