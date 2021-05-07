const express = require("express");
const router = express.Router();
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getMyPost } = require("../controllers/article");
const { articleValidator, verifyToken } = require('../config/middleware')

router.get('/', getAllArticles);
router.get('/get-id/:id', getArticleById);
router.get('/my-posts/', verifyToken, getMyPost);
router.post('/my-posts/create/', verifyToken, articleValidator, createArticle);
router.put('/my-posts/update/:id', verifyToken, articleValidator, updateArticle);
router.delete('/my-posts/delete/:id', verifyToken, deleteArticle);

module.exports = router;