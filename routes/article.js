const express = require("express");
const router = express.Router();
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getMyPost } = require("../controllers/article");
const { articleValidator, verifyToken } = require('../config/middleware')

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.get('/my-posts/:token', verifyToken, getMyPost);
router.post('/create/:token', verifyToken, articleValidator, createArticle);
// router.put('/:id_article', updateArticle);
router.delete('/:token/:id', verifyToken, deleteArticle);

module.exports = router;