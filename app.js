const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { NOT_FOUND } = require('./utils/utils');
const { login } = require('./controllers/users');
const { createUsers } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorMiddleware = require('./middlewares/error');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, PATH_MONGO = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.set('strictQuery', false);

mongoose.connect(PATH_MONGO, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUsers);

app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Такой страницы не существует.' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
