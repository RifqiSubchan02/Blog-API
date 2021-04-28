const { body } = require('express-validator');

const userValidator = [
  body('email')
    .notEmpty().withMessage('Please input your email address')
    .isEmail().withMessage('Email is not valid'),
  body('password')
    .notEmpty().withMessage('Please input your password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long'),
  body('name')
    .notEmpty().withMessage('Please input your name')
    .isLength({ min: 5 })
    .withMessage('Your name must be at least 5 chars long'),
];

module.exports = { userValidator };