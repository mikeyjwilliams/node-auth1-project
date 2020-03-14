const express = require('express');
const router = express.Router();
const Users = require('./users-model');
const restrict = require('../middleware/restrict');

router.get('/users', restrict(), async (req, res, next) => {
	try {
		const users = await Users.getAll();
		if (users.length <= 0) {
			res.status(400).json({ message: 'no users to get' });
		}
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
