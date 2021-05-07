const { Article, User, Category } = require("../config/db/models")
const { validationResult } = require('express-validator');

exports.getAllArticles = (req, res, next) => {
  const statusArticle = req.query.status || 1;
  Article.findAll({ where: { status: statusArticle }, include: [User, Category] })
    .then((result) => {
      res.status(200).json({
        message: "Get All Article",
        data: result,
      })
    })
    .catch(error => res.status(400).json(error));
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.id
  Article.findByPk(id, { include: [User, Category] })
    .then((result) => {
      res.status(200).json({
        message: `Get Article by ID ${id}`,
        data: result,
      });
    })
    .catch(error => res.status(400).json(error));
}

exports.getMyPost = (req, res, next) => {
  const userId = req.user.id;
  Article.findAll({
    where: {
      userId: userId
    }
  })
    .then(result => {
      res.status(200).json({
        message: 'Get My Post',
        data: result
      })
    })
    .catch(error => res.status(400).json(error))
}

exports.createArticle = (req, res, next) => {
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    Article.create(
      {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        imageUrl: req.file.path,
        userId: userId,
        categoryId: req.body.categoryId,
        createdAt: Date(),
        updatedAt: Date()
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "Article Created",
        });
      })
      .catch(error => res.status(400).json(error));
  }
}

// exports.updateArticle = async (req, res, next) => {
//   await Article.update(
//     {
//       id_category: req.body.id_category,
//       title: req.body.title,
//       image: req.body.image,
//       body: req.body.body,
//       status: req.body.status,
//     },
//     {
//       where: {
//         id_article: req.params.id_article
//       }
//     }
//   )
//     .then((result) => {
//       if (result == 0) {
//         return res.status(400).json({
//           message: `Article ID ${req.params.id_article} Not Found`
//         })
//       }
//       res.status(200).json({
//         message: `Article with ID ${req.params.id_article} is UPDATED`,
//       })
//     })
//     .catch(error => console.error(error));
// };

exports.deleteArticle = (req, res, next) => {
  Article.destroy({
    where: { id: req.params.id }
  })
    .then((result) => {
      res.status(200).json({
        message: `Article with ID ${req.params.id} Deleted`
      })
    })
    .catch(error => res.status(400).json(error));
}