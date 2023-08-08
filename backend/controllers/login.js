const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    return res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
};
