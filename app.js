const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const mongoose = require('mongoose');

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

// app.use((req, res, next) => {
//   req.user = {
//     _id: '648c8342e717e3816e058be9', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.use(express.json());
app.post('/signin', createUser);
app.post('/signup', login);
app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));
app.all('/*', auth, require('./controllers/error'));

app.listen(PORT, () => {
});
