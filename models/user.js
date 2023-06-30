const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validator: (url) => isUrl(url),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

module.exports = mongoose.model('user', userSchema);
