const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  id: Number
});

module.exports = mongoose.model('User', userSchema);
