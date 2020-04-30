const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Leaderboard = require('../models/leaderboard');
const User = require('../models/user');

const compare = function(a, b) {
  if(a.points < b.points)
		return 1;
	return -1;
}

const sortLeaderboard = function(res) {
	User
		.find()
		.exec()
		.then(users => {
			Leaderboard.updateOne({id: 1}, {scoreboard: users.slice()})
			.exec()
			.then(result => {
				Leaderboard.find({id:1})
					.exec()
					.then(leaderboard => {
						var sortedBoard = leaderboard[0].scoreboard.sort(compare);
						for (var i=0;i<sortedBoard.length;i++){
							if(i==0){
								sortedBoard[i].rank = 1;
							}
							else{
								if(sortedBoard[i].points == sortedBoard[i-1].points){
									sortedBoard[i].rank = sortedBoard[i-1].rank;
								}
								else{
									sortedBoard[i].rank = i+1;
								}
							}
						}
						//console.log(sortedBoard);
						Leaderboard.updateOne({id: 1}, {scoreboard: sortedBoard.slice()})
							.exec()
							.then(result => {
								res.status(200).json(
									sortedBoard.map(user => {
										return {
											"rank": user.rank,
											"points": user.points,
											"display_name": user.display_name,
											"country": user.country
										}
									}));
							})
							.catch(err => {
								console.log('oops');
								res.status(404).json(err);
							});
						})
						.catch(err => {
							console.log(err);
							res.status(404).json(err);
						});
			})
			.catch(err => {
				res.status(404).json(err);
			});
		})
		.catch(err => {
			res.status(404).json(err);
		});
}

const sortAndFilterLeaderboardByCountry = function(req,res) {

	User
		.find()
		.exec()
		.then(users => {
			Leaderboard.updateOne({id: 1}, {scoreboard: users.slice()})
			.exec()
			.then(result => {
				Leaderboard.find()
					.exec()
					.then(leaderboard => {
						var sortedBoard = leaderboard[0].scoreboard.sort(compare);
						for (var i=0;i<sortedBoard.length;i++){
							if(i==0){
								sortedBoard[i].rank = 1;
							}
							else{
								if(sortedBoard[i].points == sortedBoard[i-1].points){
									sortedBoard[i].rank = sortedBoard[i-1].rank;
								}
								else{
									sortedBoard[i].rank = i+1;
								}
							}
						}
						const filteredScoreboard = sortedBoard.filter(d => d.country == req.params.countryISO);
						res.status(200).json(
							filteredScoreboard.map(user => {
								return {
									"rank": user.rank,
									"points": user.points,
									"display_name": user.display_name,
									"country": user.country
								}}));
					})
					.catch(err => {
						res.status(404).json({
							error: err
						})
					});
			})
			.catch(err => {
				res.status.json(err);
			})
		})
		.catch(err => {
			res.status(404).json(err);
		})
}

router.get('/', (req,res,next) => {

	Leaderboard.find({id:1})
		.exec()
		.then(leaderboard => {
			if(leaderboard.length==0){
				const newLeaderboard = new Leaderboard({
					_id: mongoose.Types.ObjectId(),
					scoreboard: [],
					id: 1
				});
				newLeaderboard
					.save()
					.then(result => {
						sortLeaderboard(res);
					})
					.catch(err => {
						res.status(404).json(err);
					});
			}
			else{
				sortLeaderboard(res);
			}
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

router.get('/:countryISO', (req, res, next) => {

	Leaderboard.find({id:1})
		.exec()
		.then(leaderboard => {
			if(leaderboard.length==0){
				const newLeaderboard = new Leaderboard({
					_id: mongoose.Types.ObjectId(),
					scoreboard: [],
					id: 1
				});
				newLeaderboard
					.save()
					.then(result => {
						sortAndFilterLeaderboardByCountry(req,res);
					})
					.catch(err => {
						res.status(404).json(err);
					});
			}
			else{
				sortAndFilterLeaderboardByCountry(req,res);
			}
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

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
