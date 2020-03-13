function restrict() {
  const authErr = { message: 'You Shall Not Pass!' };
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
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
