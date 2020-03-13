const express = require('express');
const Users = require('../users/users-model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const restrict = require('../middleware/restrict');

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  // if (req.body === {}) {
  // 	return res.status(400).json({ message: 'username password required' });
  // }
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }

  try {
    const userTaken = await Users.findBy({ username }).first();

    if (userTaken) {
      return res.status(409).json({ message: 'username is already taken' });
    } else {
      const user = {
        username: username,
        password: password,
      };
      const addUser = await Users.addUser(user);

      res.status(201).json(addUser);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'username is required.' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required.' });
  }
  try {
    const user = await Users.findBy({ username }).first();

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!user || !passwordCheck) {
      return res.status(401).json({ message: 'You shall not Pass!' });
    }

    req.session.user = user;
    res.status(200).json({
      message: `Logged in ${user.username}`,
      id: `${user.id}`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/logout', restrict(), (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: 'successfully logged out' });
    }
  });
});

module.exports = router;
