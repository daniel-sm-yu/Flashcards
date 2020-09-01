const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; // same as cards = data.cards;

router.get('/', (req, res) => {
	const id = Math.floor(Math.random() * cards.length);
	res.redirect(`/cards/${id}`);
});

// the '/' tells express to treat this part of the url as a variable, and stores the value in id (inside params)
router.get('/:id', (req, res) => {
	const { side } = req.query;
	const { id } = req.params;

	if (!side) {
		res.redirect(`/cards/${id}?side=question`);
	}

	const name = req.cookies.username;
	const text = cards[id][side];
	const { hint } = cards[id];

	const templateDate = { id, text, name, side };

	if (side === 'question') {
		templateDate.hint = hint;
		templateDate.sideToShow = 'answer';
	} else if (side === 'answer') {
		templateDate.sideToShow = 'question';
	}

	res.render('card', templateDate);
});

module.exports = router;
