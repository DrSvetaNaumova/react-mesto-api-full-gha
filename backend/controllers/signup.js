const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictUserError = require('../errors/ConflictUserError');

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    let user;
    try {
      user = await User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictUserError('Пользователь с данным email уже зарегистрирован.');
      } else {
        throw err;
      }
    }
    return res
      .status(201)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
  } catch (err) {
    return next(err);
  }
};
