const { Article } = require("../config/models")

exports.getAllArticles = async (req, res, next) => {
  await Article.findAll()
    .then((result) => {
      res.status(200).json({
        message: "Get All Article",
        data: result,
      })
    })
    .catch(error => console.error(error));
};

exports.getArticleById = async (req, res, next) => {
  await Article.findByPk(req.params.id_article)
    .then((result) => {
      res.status(200).json({
        message: `Get Article by ID ${req.params.id_article}`,
        data: result,
      });
    })
    .catch(error => console.error(error));
}

exports.createArticle = async (req, res, next) => {
  await Article.create(
    {
      id_article: req.body.id_article,
      id_user: req.body.id_user,
      id_category: req.body.id_category,
      title: req.body.title,
      image: req.body.image,
      body: req.body.body,
      status: req.body.status,
      createdAt: Date(),
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Article Created",
      });
    })
    .catch(error => console.error(error));
}

exports.updateArticle = async (req, res, next) => {
  await Article.update(
    {
      id_category: req.body.id_category,
      title: req.body.title,
      image: req.body.image,
      body: req.body.body,
      status: req.body.status,
    },
    {
      where: {
        id_article: req.params.id_article
      }
    }
  )
    .then((result) => {
      if (result == 0) {
        return res.status(400).json({
          message: `Article ID ${req.params.id_article} Not Found`
        })
      }
      res.status(200).json({
        message: `Article with ID ${req.params.id_article} is UPDATED`,
      })
    })
    .catch(error => console.error(error));
};

exports.deleteArticle = async (req, res, next) => {
  await Article.destroy({
    where: { id_article: req.params.id_article }
  })
    .then((result) => {
      res.status(200).json({
        message: `Article with ID ${req.params.id_article} Deleted`
      })
    })
    .catch(error => console.error(error));
}