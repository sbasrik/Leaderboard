const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  rank: Number,
  points: Number,
  display_name: String,
  country: String
});

module.exports = mongoose.model('User', userSchema);
