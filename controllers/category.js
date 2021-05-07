const { Category } = require('../config/db/models')

exports.getAllCategories = (req, res) => {
  Category.findAll()
    .then(categories => {
      res.status(200).json({
        message: "Get All Categories",
        data: categories
      });
    })
    .catch(error => res.status(404).json({ message: error }))
}

exports.addCategory = (req, res) => {
  Category.create({
    name: req.body.name,
    createdAt: Date(),
    updatedAt: Date()
  })
    .then(result => {
      res.status(200).json({ message: "Category created" })
    })
    .catch(error => {
      res.status(400).json({ message: error })
    })
}