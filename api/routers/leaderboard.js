const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Leaderboard = require('../models/leaderboard');

const compare = function(a, b) {
  if(a.points > b.points)
		return 1;
	return -1;
}

router.get('/', (req,res,next) => {

	Leaderboard.find({id:1})
		.exec()
		.then(leaderboard => {
			const firstLeaderboard = leaderboard[0];
			const sortedBoard = firstLeaderboard.scoreboard.sort(compare);
			Leaderboard.updateOne({id: 1}, {scoreboard: sortedBoard});
			res.status(200).json(sortedBoard);
		})
		.catch(err => {
			res.status(404).json(err.message);
		});
});

router.get('/:countryISO', (req, res, next) => {
	Leaderboard.find()
		.exec()
		.then(leaderboard => {
			const filteredScoreboard = leaderboard[0].scoreboard.filter(d => d.country == req.params.countryISO);
			res.status(200).json(filteredScoreboard);
		})
		.catch(err => {
			res.status(404).json({
				error: err
			})
		});
})

router.post('/:leaderboardId', (req,res,next) => {
	const leaderboard = new Leaderboard({
		_id: mongoose.Types.ObjectId(),
	  scoreboard: [],
	  id: req.params.leaderboardId
	});
	leaderboard
		.save()
		.then( result => {
			res.status(201).json({
				message: 'Leaderboard ' + req.params.leaderboardId + ' Created'
			})})
		.catch(err => {
			console.log(err.message);
			res.status(500).json({
				error: err.message
			});
		});
});

router.delete('/:leaderboardId', (req,res,next) => {
	Leaderboard
		.deleteOne({ id:req.params.leaderboardId })
		.exec()
		.then(result => {
			res.status(201).json({
				message: 'Leaderboard ' + req.params.leaderboardId + ' Deleted'
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message
			});
		});
})

module.exports = router;
