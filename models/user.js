const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
  role: String,
  active: Boolean,
  avatar: String,
});

module.exports = mongoose.model('User', UserSchema);
