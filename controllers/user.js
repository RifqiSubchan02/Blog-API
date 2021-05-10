require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const { User } = require('../config/db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((result) => {
      res.status(200).json({
        message: "Get All Users",
        data: result,
      });
    })
    .catch(error => console.error(error));
};

exports.getUserByID = (req, res, next) => {
  const id = req.user.id;
  User.findByPk(id)
    .then((result) => {
      res.status(200).json({
        message: `Get User by ID ${id}`,
        data: result,
      })
    })
    .catch(error => console.error(error));
}

exports.userLogin = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).json({ message: 'Email not found' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid Password' });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  res.status(200).json({ access_token: token });
}

exports.userRegister = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    try {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          imageId: imageUpload.public_id,
          imageUrl: imageUpload.secure_url,
          createdAt: Date(),
          updatedAt: Date(),
        }
      )
        .then((result) => {
          res.status(200).json({
            message: "Register Success",
          });
        })
        .catch(async error => {
          await cloudinary.uploader.destroy(imageUpload.public_id);
          res.status(400).json(error);
        });
    } catch (error) {
      res.status(400).json({
        message: 'Please select image user'
      })
    }
  }
}

exports.userUpdated = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const id = await req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    if (!req.file) {
      User.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          updatedAt: Date(),
        },
        {
          where: {
            id,
          }
        }
      )
        .then((result) => {
          if (result == 0) {
            return res.status(400).json({
              message: `ID ${id} Not Found`
            })
          }
          res.status(200).json({
            message: `User with ID ${id} is UPDATED`,
          })
        })
        .catch(error => res.status(400).json(error));
    } else {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      User.findByPk(id)
        .then(async user => {
          await cloudinary.uploader.destroy(user.imageId);
          return User.update(
            {
              email: req.body.email,
              password: hashedPassword,
              name: req.body.name,
              imageId: imageUpload.public_id,
              imageUrl: imageUpload.secure_url,
              updatedAt: Date()
            },
            {
              where: {
                id,
              }
            }
          )
        })
        .then((result) => {
          if (result == 0) {
            return res.status(400).json({
              message: `ID ${id} Not Found`
            })
          }
          res.status(200).json({
            message: `User with ID ${id} is UPDATED`,
          })
        })
        .catch(error => res.status(400).json(error));
    }
  }
}

exports.userDeleted = (req, res, next) => {
  const id = req.user.id;
  User.findByPk(id)
    .then(async user => {
      await cloudinary.uploader.destroy(user.imageId);
      return User.destroy({ where: { id } });
    })
    .then((result) => {
      res.status(200).json({
        message: `User with ID ${req.params.id} is DELETED`,
        data: result,
      })
    })
    .catch(error => res.status(500).json({ message: error }));
}