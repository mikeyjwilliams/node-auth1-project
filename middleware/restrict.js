const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

function restrict() {
	const authErr = { message: 'invalid credentials' };
	return async (req, res, next) => {
		const { username, password } = req.headers;
		if (!username || !password) {
			res.status(401).json(authErr);
		}
		try {
			const userCheck = await Users.findBy({ username }).first();

			if (!userCheck) {
				res.status(401).json(authErr);
			}
			const passwordCheck = await bcrypt.compare(password, userCheck.password);

			if (!passwordCheck) {
				res.status(401).json(authErr);
			}
			next();
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}

module.exports = restrict;
