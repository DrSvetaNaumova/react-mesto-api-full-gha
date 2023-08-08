const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getCurrentUserInfo,
  getUserById,
  updateUserNameAndAbout,
  updateUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getAllUsers);

// возвращает текущего пользователя
router.get('/me', getCurrentUserInfo);

// возвращает пользователя по _id
router.get(
  '/:userId',
  celebrate({
    params: Joi.object({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

// обновляет профиль пользователя
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserNameAndAbout,
);

// обновляет аватар пользователя
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object({
      avatar: Joi.string().pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/).required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
