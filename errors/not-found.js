class ValidationErrorCode extends Error {
  constructor(message = 'Не найдено') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = ValidationErrorCode;
