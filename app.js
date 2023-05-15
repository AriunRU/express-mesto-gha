const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorMiddleware = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./utils/logger');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { NOT_FOUND_404 } = require('./utils/utils');
const { login, createUsers } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateLogin, validateRegister } = require('./utils/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUsers);

app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res) => {
  res.status(NOT_FOUND_404).send({ message: 'Такой страницы не существует' });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
