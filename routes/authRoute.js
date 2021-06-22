const express = require('express');
const router = express.Router();
const authController = require('./../controller/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.use(authController.protect);

router.get('/test', authController.getUser);

module.exports = router;
