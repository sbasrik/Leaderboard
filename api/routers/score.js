const express = require('express');
const router = express.Router();

router.post('/submit', (req,res,next) => {
	res.status(201).json({
		message: 'Handling POST request to /score/submit'
	});
});

module.exports = router;