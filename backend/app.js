const express = require('express');

const cors = require('cors');

require('dotenv').config();

const { PORT = 3000, NODE_ENV } = process.env;

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { errors } = require('celebrate');

const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler, logErrors } = require('./middlewares/errors');

const router = require('./routes/index');

app.use(express.json());

if (NODE_ENV === 'production') {
  app.use(
    cors({
      origin: [
        'https://drsvetanaumova.nomoreparties.co',
        'http://drsvetanaumova.nomoreparties.co',
      ],
    }),
  );
} else {
  app.use(cors());
}

app.use(
  helmet(),
);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(logErrors, errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
