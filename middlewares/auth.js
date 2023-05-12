const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error'); // 401

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
  } catch (err) {
    next(err);
  }

  next();
};
