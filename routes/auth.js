const express = require('express');
const authController = require('../controllers/auth');
const { check } = require('express-validator/check');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post(
  '/signup',
  check('email').
  isEmail().
  withMessage('Please enter a valid email address')
  .custom((value)=>{}),
  authController.postSignup
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

//6hqpa

module.exports = router;
