const error = (req, res) => {
  res.status(404).send({ message: "Неправильный путь" });
};

module.exports = error;
