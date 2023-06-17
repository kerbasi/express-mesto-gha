const NO_FIND_ERROR_CODE = 404;

const error = (req, res) => {
  res.status(NO_FIND_ERROR_CODE).send({ message: 'Неправильный путь' });
};

module.exports = error;
