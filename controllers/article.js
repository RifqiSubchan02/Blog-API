require('dotenv').config();
const { Article, User, Category } = require("../config/db/models")
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

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
  Article.findAll({where: {userId: userId},include: [User, Category]})
    .then(result => {
      res.status(200).json({
        message: 'Get My Post',
        data: result
      })
    })
    .catch(error => res.status(400).json(error))
}

exports.createArticle = async (req, res, next) => {
  const userId = await req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    try {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      Article.create(
        {
          title: req.body.title,
          body: req.body.body,
          status: req.body.status,
          imageId: imageUpload.public_id,
          imageUrl: imageUpload.secure_url,
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
    } catch (error) {
      res.status(400).json({ message: 'Please select image article' });
    }
  }
}

exports.updateArticle = async (req, res, next) => {
  const id = await req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    if (!req.file) {
      Article.update(
        {
          title: req.body.title,
          body: req.body.body,
          status: req.body.status,
          categoryId: req.body.categoryId,
          updatedAt: Date()
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(result => {
          if (result == 0) {
            return res.status(400).json({
              message: `Article ID ${id} Not Found`
            })
          }
          res.status(200).json({
            message: `Article with ID ${id} is UPDATED`,
          })
        })
        .catch(error => res.status(401).json(error))
    } else {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      Article.findByPk(id)
        .then(async article => {
          await cloudinary.uploader.destroy(article.imageId);
          return Article.update(
            {
              title: req.body.title,
              body: req.body.body,
              status: req.body.status,
              imageId: imageUpload.public_id,
              imageUrl: imageUpload.secure_url,
              categoryId: req.body.image,
              updatedAt: Date(),
            },
            {
              where: {
                id: id
              }
            }
          )
        })
        .then((result) => {
          if (result == 0) {
            return res.status(400).json({
              message: `Article ID ${id} Not Found`
            })
          }
          res.status(200).json({
            message: `Article with ID ${id} is UPDATED`,
          })
        })
        .catch(error => res.status(400).json(error));
    }
  }
};

exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;
  Article.findByPk(id)
    .then(async article => {
      await cloudinary.uploader.destroy(article.imageId);
      return Article.destroy({ where: { id: id } })
    })
    .then((result) => {
      res.status(200).json({
        message: `Article with ID ${id} Deleted`
      })
    })
    .catch(error => res.status(400).json(error));
}