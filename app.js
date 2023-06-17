const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
});

app.use((req, res, next) => {
  req.user = {
    _id: '648c8342e717e3816e058be9', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.all('/*', require('./controllers/error'));

app.listen(PORT, () => {
});
