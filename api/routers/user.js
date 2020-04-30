const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Leaderboard = require('../models/leaderboard');

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

router.get('/profile/:userId', (req,res,next) => {
	const id = req.params.userId;
	User.find( {user_id: id}, 'user_id display_name points rank')
		.exec()
		.then(doc => {
			if(doc){
				res.status(200).json(doc);
			}
			else {
				res.status(404).json({message: "No valid user id provided"});
			}
		})
		.catch(err => {
			res.status(500).json({error: err});
		});
});

router.get('/all', (req,res,next) => {
	User.find()
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

router.post('/create', (req,res,next) => {

	const userObject = {
		_id: new mongoose.Types.ObjectId(),
		user_id: req.body.user_id || uuidv4(),
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

});

router.delete('/deleteAll', (req,res,next) => {
	User.deleteMany()
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

router.delete('/:userId', (req,res,next) => {
	User.deleteOne({user_id: req.params.userId})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

module.exports = router;
