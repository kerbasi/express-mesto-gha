const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const PermissionError = require('../errors/permission-error');

const SUCCESS_CREATE_CODE = 201;

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_CREATE_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Произошла ошибка, введенные данные неверны'));
      return next(err);
    });
};

module.exports.findAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          return Card.deleteOne(card).then(() => res.send(card));
        }
        throw new PermissionError('Это не ваша карточка');
      }
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }).catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Некоректно задан id'));
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) return res.send(card);
    throw new NotFoundError('Запрашиваемая карточка не найдена');
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Некоректно задан id'));
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) return res.send(card);
    throw new NotFoundError('Запрашиваемая карточка не найдена');
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new ValidationError('Некоректно задан id'));
      return next(err);
    });
};
