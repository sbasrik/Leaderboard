const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const leaderboardRouter = require('./api/routers/leaderboard');
const scoreRouter = require('./api/routers/score');
const userRouter = require('./api/routers/user');


mongoose.connect('mongodb+srv://user-semih:pw-semih@leaderboard-aqqlj.mongodb.net/test?retryWrites=true&w=majority',
					{
						useNewUrlParser: true,
						useUnifiedTopology: true
					})
					.then(() => console.log( 'Database Connected' ))
     			.catch(err => console.log( err ));
/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sbasrik:pwsbasrik@leaderboard-gaerz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Origin",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
})

app.use('/leaderboard', leaderboardRouter);
app.use('/score', scoreRouter);
app.use('/user', userRouter);

app.use((req,res,next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

module.exports = app;
