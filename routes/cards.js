const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  findAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', findAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/).required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
