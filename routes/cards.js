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

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
