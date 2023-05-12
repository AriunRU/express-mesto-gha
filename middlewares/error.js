const { INTERNAL_SERVER_ERROR } = require('../utils/error-constants');

module.exports = (error, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = error;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR // 500
        ? 'Ошибка сервера.'
        : message,
    });
  next();
};
