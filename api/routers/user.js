const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Leaderboard = require('../models/leaderboard');

router.get('/profile/:userId', (req,res,next) => {
	const id = req.params.userId;
	User.find( {user_id: id}, 'user_id display_name points rank')
		.exec()
		.then(doc => {
			console.log("From Database" + doc);
			if(doc){
				res.status(200).json(doc);
			}
			else {
				res.status(404).json({message: "No valid user id provided"});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
});

router.post('/create', (req,res,next) => {

	const userObject = {
		_id: new mongoose.Types.ObjectId(),
		user_id: req.body.user_id,
		display_name: req.body.display_name,
		points: req.body.points,
		rank: req.body.rank,
		country: req.body.country
	}

	const user = new User(userObject);
	user
		.save()
		.then(result => {
			res.status(201).json({
				message: 'User Created',
				createdUser: user
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});

		Leaderboard.find({id: 1})
		.exec()
		.then(result => {
			leaderboard = result[0];
			var newScoreboard = leaderboard.scoreboard.slice();
			newScoreboard.push(userObject);
			console.log(newScoreboard);
			console.log(leaderboard)
			Leaderboard.updateOne({id: 1}, {scoreboard: newScoreboard})
				.exec()
				.then(result =>{
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				});
		})

});

module.exports = router;
