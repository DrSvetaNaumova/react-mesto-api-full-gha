const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(console.log('mongodb connected'));

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler, logErrors } = require('./middlewares/errors');

const router = require('./routes/index');

app.use(express.json());

app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000', 'https://drsvetanaumova.nomoreparties.co', 'http://drsvetanaumova.nomoreparties.co'] }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(logErrors, errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});