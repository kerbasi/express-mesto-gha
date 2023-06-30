const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const VALIDATION_ERROR_CODE = 400;
const NO_FIND_ERROR_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Произошла ошибка, введенные данные неверны' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      }
      return res.status(NO_FIND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Некоректно задан id' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Произошла ошибка, введенные данные неверны' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Произошла ошибка, введенные данные неверны' });
      return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
