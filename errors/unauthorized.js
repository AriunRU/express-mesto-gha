class ErrorUnauthorized extends Error {
  constructor(message = 'Необходима авторизация.') {
    super(message);
    this.message = (`401 Unauthorized — ${message}`);
    this.statusCode = 401;
  }
}

module.exports = ErrorUnauthorized;
