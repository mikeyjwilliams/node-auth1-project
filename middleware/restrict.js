function restrict() {
  const authErr = { message: 'invalid credentials' };
  return async (req, res, next) => {
    try {
      if (!res.session || !req.session.user) {
        return res.status(401).json(authErr);
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = restrict;
