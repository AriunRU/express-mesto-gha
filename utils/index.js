const mongooseError = require('mongoose').Error;
const {
  BAD_REQUEST_400, SERVER_ERROR_500, UNAUTHORIZED_401, NOT_FOUND_404, FORBIDDEN_403, CONFLICT_409,
} = require('../constants/constants');
const ForbiddenError = require('./customError/ForbiddenError');
const NotFoundError = require('./customError/NotFoundError');
const UnauthorizedError = require('./customError/UnauthorizedError');

const handleError = (err, req, res, next) => {
  if (err instanceof mongooseError.ValidationError) {
    const resError = { message: `${Object.values(err.errors).map((error) => error.message).join(' ')}` };
    res.status(BAD_REQUEST_400).send(resError);
    return;
  }
  if (err instanceof mongooseError.CastError) {
    res.status(BAD_REQUEST_400).send({ message: 'Ошибка в передаваеммых данных или типе запроса' });
    return;
  }
  if (err instanceof UnauthorizedError) {
    res.status(UNAUTHORIZED_401).send({ message: err.message });
    return;
  }
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_404).send({ message: err.message });
    return;
  }
  if (err instanceof ForbiddenError) {
    res.status(FORBIDDEN_403).send({ message: err.message });
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICT_409).send({ message: 'Такой Email уже зарегистрирован' });
    return;
  }
  res.status(SERVER_ERROR_500).send({ message: 'Произошла ошибка на сервере' });
  next();
};

module.exports = { handleError };
