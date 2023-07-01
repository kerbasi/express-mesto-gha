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

router.get('/me', findMe);

router.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), findUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
