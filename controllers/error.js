const NotFoundError = require('../errors/not-found-error');

const error = (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
};

module.exports = error;
