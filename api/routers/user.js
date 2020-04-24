const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/profile/:userId', (req,res,next) => {
	const id = req.params.userId;
	res.status(200).json({
		message: 'Handling GET request to /user/profile/userId. User Id: ' + id
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
