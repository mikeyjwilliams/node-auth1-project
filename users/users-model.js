const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
  addUser,
  findById,
  findBy,
  find,
};

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 15);

  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'username')
    .first();
}
