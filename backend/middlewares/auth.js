const jwt = require('jsonwebtoken');
const UnauthorizedUserError = require('../errors/UnauthorizedUserError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedUserError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      throw new UnauthorizedUserError('Необходима авторизация');
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    return next(); // пропускаем запрос дальше
  } catch (err) {
    return next(err);
  }
};
