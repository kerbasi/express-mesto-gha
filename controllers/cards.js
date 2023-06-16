const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    )
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: `Произошла ошибка: ${err}` });
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ ...cards }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send("card deleted"))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    );
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).catch((err) =>
    res.status(500).send({ message: `Произошла ошибка: ${err}` })
  );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).catch((err) =>
    res.status(500).send({ message: `Произошла ошибка: ${err}` })
  );
