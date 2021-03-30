const { model } = require('mongoose');

const Users = model('User', {
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

module.exports = Users;
