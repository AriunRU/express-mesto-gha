const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorMiddleware = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./utils/logger');
const router = require('./routes/router');

const app = express();
const { PORT = 3000, PATH_MONGO = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.set('strictQuery', false);

mongoose.connect(PATH_MONGO, {
  useNewUrlParser: true,
});

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
