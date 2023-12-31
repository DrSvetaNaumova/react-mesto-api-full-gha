const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedUserError = require('../errors/UnauthorizedUserError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minLength: [2, 'Минимальная длина поля "имя" - 2'],
      maxLength: [30, 'Максимальная длина поля "имя" - 30'],
    },

    about: {
      type: String,
      default: 'Исследователь',
      minLength: [2, 'Минимальная длина поля "имя" - 2'],
      maxLength: [30, 'Максимальная длина поля "имя" - 30'],
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка',
      },
    },

    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },

    password: {
      type: String,
      required: [true, 'Поле "пароль" должно быть заполнено'],
      select: false,
    },

  },

  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedUserError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedUserError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
