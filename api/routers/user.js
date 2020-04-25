const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/profile/:userId', (req,res,next) => {
	const id = req.params.userId;
	console.log('here');
	User.findById(id)
		.exec()
		.then(doc => {
			console.log("From Database" + doc);
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
});

router.post('/create', (req,res,next) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		id: req.body.id
	});
	user
		.save()
		.then(result => {
			console.log(result)
		})
		.catch(err => console.log(err));
	res.status(201).json({
		message: 'Handling POST request to /user/create',
		createdUser: user
	});
});

module.exports = router;
