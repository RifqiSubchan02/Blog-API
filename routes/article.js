const express = require("express");
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require("../controllers/article");
const router = express.Router();

router.get('/', getAllArticles);
// router.get('/:id_article', getArticleById);
// router.post('/', createArticle);
// router.put('/:id_article', updateArticle);
// router.delete('/:id_article', deleteArticle);

module.exports = router;