require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима Ваша авторизация.'));
  }

  req.user = payload;
  return next();
};
