const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "название" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля "название" - 2'],
      maxLength: [30, 'Максимальная длина поля "название" - 30'],
    },

    link: {
      type: String,
      required: [true, 'Поле "ссылка на картинку" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user', // необходимо для правильной работы метода populate, который объединяет объекты из разных коллекций БД.
    },

    likes: {
      type: mongoose.Schema.Types.Array,
      default: [],
      ref: 'user', //  необходимо для правильной работы метода populate, который объединяет объекты из разных коллекций БД.
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
