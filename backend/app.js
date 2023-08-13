require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, logErrors } = require('./middlewares/errors');
const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cors({ origin: ['https://drsvetanaumova.nomoreparties.co', 'http://drsvetanaumova.nomoreparties.co'] }));
app.use(requestLogger);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(logErrors, errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
