const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('./data/config');
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const router = express();

router.use(express.json());
router.use(
  session({
    name: 'token',
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    store: new KnexSessionStore({
      createtable: true,
      knex: dbConfig,
    }),
  })
);

router.use('/api', authRouter);
router.use('/api', userRouter);

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
