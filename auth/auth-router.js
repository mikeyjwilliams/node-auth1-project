const express = require('express');
const Users = require('../users/users-model');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
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
    }
    const user = {
      username: username,
      password: password,
    };
    const addUser = await Users.addUser(user);

    res.status(201).json(addUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
