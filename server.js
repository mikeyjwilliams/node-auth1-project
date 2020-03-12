const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router');
const router = express();

router.use(express.json());

router.use('/api', authRouter);

router.get('/', (req, res) => {
	res.status(200).json({ message: 'welcome to users API' });
});

router.use((req, res) => {
	res.status(404).json({ message: '404 page not found' });
});

router.use((err, req, res, next) => {
	res.status(500).json({ message: 'internal server error' });
});

module.exports = router;
