const { SERVER_ERROR_500 } = require('../utils/utils');

module.exports = (error, req, res, next) => {
  const { statusCode = SERVER_ERROR_500, message } = error;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_500
        ? 'Ошибка сервера.'
        : message,
    });
  next();
};
