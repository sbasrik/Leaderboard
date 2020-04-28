const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  score_worth: Number,
  user_id: Number,
  timestamp: Number
});

module.exports = mongoose.model('Score', scoreSchema);
