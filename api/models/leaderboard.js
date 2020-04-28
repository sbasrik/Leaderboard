const mongoose = require('mongoose');

var userS = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: Number,
  rank: Number,
  points: Number,
  display_name: String,
  country: String
});

const leaderboardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  scoreboard: [userS],
  id: Number
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
