const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');
const articleAdminController = require('../controllers/admin/article');

router.get('/', ArticleController.getAllArticles);
router.get('/article/:slug', ArticleController.getArticleBySlug);

router.post('/admin/article/create', articleAdminController.createArticle);

module.exports = router;