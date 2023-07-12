const NotFoundError = require('../errors/not-found-error');

const error = (next) => {
  next(new NotFoundError('Неправильный путь'));
};

module.exports = error;
