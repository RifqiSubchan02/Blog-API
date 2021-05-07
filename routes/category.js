const express = require('express');
const { getAllCategories, addCategory } = require('../controllers/category');
const router = express();

router.get('/', getAllCategories);
router.post('/', addCategory);

module.exports = router;