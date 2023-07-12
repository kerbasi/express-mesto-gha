const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');

const app = express();
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
});

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));
app.all('/*', auth, require('./controllers/error'));

app.use(errors());

app.use((err, res) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
});
