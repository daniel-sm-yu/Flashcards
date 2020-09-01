const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// this sets up static server and passes static assets to the client
app.use('/static', express.static('public')); // things in public become accessible from the specified folder

app.set('view engine', 'pug');

// the index.js file is selected by default
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// if a request doesn't match any routes and doesn't trigger any errors, it becomes a 404 error
// here, we are "catching" that error and passing it to our error middleware to handle
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// ERROR MIDDLEWARE (err, req, res, next):

app.use((err, req, res, next) => {
	res.locals.error = err; // same as passing err in res.render()
	res.status(err.status);
	res.render('error');
});

app.listen(port, () => {
	console.log('The application is running on local:host' + port);
});
