class IntervalServerError extends Error {
  constructor(message = 'Внутренняя ошибка сервера.') {
    super(message);
    this.message = (`500 Internal Server Error — ${message}`);
    this.statusCode = 500;
  }
}

module.exports = IntervalServerError;
