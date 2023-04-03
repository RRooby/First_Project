exports.validUsers = (req, res, next) => {
  const { id, name, email } = req.body;
  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is required',
    });
  }
  next();
};
 