const Card = require('../models/card');

const VALIDATION_ERROR_CODE = 400;
const PERMISSION_DENIED = 403;
const NO_FIND_ERROR_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Произошла ошибка, введенные данные неверны' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          return Card.deleteOne(card).then(() => res.send(card));
        }
        return res.status(PERMISSION_DENIED).send({ message: 'Это не ваша карточка' });
      }
      return res.status(NO_FIND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
    }).catch((err) => {
      if (err.name === 'CastError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Некоректно задан id' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) return res.send(card);
    return res.status(NO_FIND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
  })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Некоректно задан id' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) return res.send(card);
    return res.status(NO_FIND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
  })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Некоректно задан id' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};
