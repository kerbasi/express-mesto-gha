const router = require('express').Router();

const {
  findAllUsers,
  findUser,
  findMe,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/me', findMe);

router.get('/:userId', findUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
