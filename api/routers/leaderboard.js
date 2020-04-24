const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
	res.status(200).json({
		message: 'Handling GET request to /leaderboard'
	});
});

router.post('/', (req,res,next) => {
	const leaderboard = {
		name: req.body.name,
		price: req.body.price
	};
	res.status(201).json({
		message: 'Handling POST request to /leaderboard'
	});
});

router.get('/:countryISO', (req, res, next) => {
	const country = req.params.countryISO;
	res.status(200).json({
		message: 'Country: ' + country
	})
})

module.exports = router;