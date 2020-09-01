const express = require('express');
const router = express.Router();

// MIDDLEWARE/ERROR STUFF:
// // you end a middleware function with next() or sending a response to the client
// router.use((req, res, next) => {
// 	console.log('Hello');
// 	const err = new Error('Oh no!!');
// 	err.status = 500;
// 	// passing in something to next() throws an error
// 	next(err);
// });

router.get('/', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.render('index', { name });
	} else {
		res.redirect('/hello');
	}
});

router.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.redirect('/');
	} else {
		res.render('hello');
	}
});

router.post('/hello', (req, res) => {
	// res.json(req.body); this is how to send data back to the client
	res.cookie('username', req.body.username);
	res.redirect('/');
});

router.post('/goodbye', (req, res) => {
	res.clearCookie('username');
	res.redirect('/hello');
});

module.exports = router;
