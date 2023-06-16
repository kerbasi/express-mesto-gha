const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    );
};

module.exports.findAllUsers = (req, res) => {
  User.find({}).then((users) => res.send({ ...users }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId).then((user) =>
    res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    })
  );
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
  ).then((user) =>
    res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    })
  );
};
