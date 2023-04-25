class ErrorBadRequest extends Error {
  constructor(message = 'Некорректный запрос.') {
    super(message);
    this.message = (`400 Bad Request — ${message}`);
    this.statusCode = 400;
  }
}

module.exports = ErrorBadRequest;
