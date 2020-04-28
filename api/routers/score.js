const express = require('express');
const router = express.Router();

const Score = require('../models/score');

router.post('/submit', (req,res,next) => {
	const newScore = new Score({
		_id : new mongoose.Types.ObjectId(),
		score_worth : req.body.score_worth,
		user_id : req.body.user_id,
		timestamp: Date.now()
	});

	const oldScoreWorth = -1;
	const newScoreWorth = newScore.score_worth;

	User.find({user_id: newScore.user_id})
		.exec()
		.then(res => {
			oldScore = res.score_worth;
			oldRank = res.rank;
		})
		.catch(err => console.log(err));

	User.findOneAndUpdate({user_id: newScore.user_id}, {score_worth: newScoreWorth})
		.catch(err => console.log(err));

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
