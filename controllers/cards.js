const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") return res.status(400).send({ message: "Произошла ошибка, введенные данные неверны" });
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка на сервере" }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send("card deleted"))
    .catch((err) => {
      if (err.name === "CastError") return res.status(404).send({ message: "Запрашиваемый пользователь не найден" });
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then(() => res.send("card liked"))
    .catch(() => res.status(500).send({ message: "Произошла ошибка на сервере" }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then(() => res.send("card unliked"))
    .catch(() => res.status(500).send({ message: "Произошла ошибка на сервере" }));
};
