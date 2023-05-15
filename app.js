const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorMiddleware = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./utils/logger');
const router = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(errorLogger);

app.use(errors());
app.use(errorMiddleware);

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
