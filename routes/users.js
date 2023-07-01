const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findAllUsers,
  findUser,
  findMe,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), findMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), findUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/),
  }),
}), updateUserAvatar);

module.exports = router;
