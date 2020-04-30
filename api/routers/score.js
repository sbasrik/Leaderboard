const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Score = require('../models/score');

router.post('/submit', (req,res,next) => {
	const newScore = new Score({
		_id : new mongoose.Types.ObjectId(),
		score_worth : req.body.score_worth,
		user_id : req.body.user_id,
		timestamp: req.body.timestamp
	});

	User.updateOne({user_id: newScore.user_id}, {points: newScore.score_worth})
		.exec()
		.then(result => {
			res.status(200).json("User's score updated");
		})
		.catch(err => {
			res.status(404).json(err);
		});

/*	if(oldScoreWorth < newScoreWorth){
		Leaderboard.find({score_worth: {$gt: oldScoreWorth, $lt: newScoreWorth}})
			.exec()
			.then(res => {
					const userNewRank = oldRank - res.size();
					User.findOneAndUpdate({user_id: newScore.user_id}, {rank: userNewRank});

					for (const user of res){
						const newRank = user.rank+1;
						User.findOneAndUpdate({user_id: user.user_id}, {rank: newRank});
					}
			})
			.catch(err => console.log(err));
	}
	else{
		Leaderboard.find({score_worth: {$gt: newScoreWorth, $lt:oldScoreWorth}})
			.exec()
			.then(res => {
					for (const user of res){
						const newRank = user.rank-1;
						User.findOneAndUpdate({user_id: user.user_id}, {rank: newRank});
					}
			})
			.catch(err => console.log(err));
	}

	newScore
		.save()
		.then(result => {
			console.log('Score Submitted:' + newScore);
			res.status(201).json({
				message: 'Score Submitted:',
				score: newScore
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});*/
});

module.exports = router;
