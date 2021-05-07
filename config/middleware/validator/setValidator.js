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

const articleValidator = [
  body('title')
    .notEmpty().withMessage('Please input an article title')
    .isLength({ min: 10, max: 30 }).withMessage('Title must be at least with minimum 10 chars and maximum 30 chars long'),
  body('body')
    .notEmpty().withMessage('Please input an article body')
    .isLength({ min: 30, max: 1000 }).withMessage('Body must be at least with minimum 30 chars and maximum 1000 chars long'),
  body('status')
    .notEmpty().withMessage('Please select article status')
];

module.exports = { userValidator, articleValidator };