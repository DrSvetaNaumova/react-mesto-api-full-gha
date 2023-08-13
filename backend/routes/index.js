const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

// удалить краш-тест после успешного прохождения ревью
// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

router.post('/signup', require('./signup')); // NEW
router.post('/signin', require('./login')); // NEW

router.use(auth); // NEW

// router.use('/users', auth, require('./users'));
// router.use('/cards', auth, require('./cards'));

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', require('./page404'));

module.exports = router;
