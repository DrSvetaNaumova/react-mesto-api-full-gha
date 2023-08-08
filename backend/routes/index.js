const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

router.post('/signup', require('./signup'));
router.post('/signin', require('./login'));

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', require('./page404'));

module.exports = router;
