const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', require('./signup'));
router.post('/signin', require('./login'));

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', require('./page404'));

module.exports = router;
