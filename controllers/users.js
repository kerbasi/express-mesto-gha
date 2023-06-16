const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: `Произошла ошибка: ${err}` });
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ ...users }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    );
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError")
        return res.status(404).send({ message: `Произошла ошибка: ${err}` });
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
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
    }
  )
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: `Произошла ошибка: ${err}` });
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};
