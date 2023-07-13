const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpLink } = require('../utils/regExpConstants');

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
    userId: Joi.string().length(24).hex().required(),
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
    avatar: Joi.string().regex(regExpLink),
  }),
}), updateUserAvatar);

module.exports = router;
