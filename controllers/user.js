const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const { User } = require('../config/db/models');
const jwt = require('jsonwebtoken');

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

exports.userLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email, password: req.body.password } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Email or Password are wrong"
        })
      }
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.status(200).json({ access_token: token });
    })
    .catch(error => console.error(error));
}

exports.userRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.file.path,
        createdAt: Date(),
        updatedAt: Date(),
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "Register Success",
        });
      })
      .catch(error => console.error(error));
  }
}

exports.userUpdated = (req, res, next) => {
  const id = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    if (!req.file) {
      User.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
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
        .catch(error => console.error(error));
    } else {
      User.findByPk(id)
        .then(user => {
          const filePath = path.join(__dirname, '../', user.imageUrl);
          fs.unlink(filePath, error => {
            if (error) return console.log(error);
          });
          return User.update(
            {
              email: req.body.email,
              password: req.body.password,
              name: req.body.name,
              imageUrl: req.file.path,
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
        .catch(error => console.error(error));
    }
  }
}

exports.userDeleted = (req, res, next) => {
  const id = req.user.id;
  User.findByPk(id)
    .then(user => {
      const filePath = path.join(__dirname, '../', user.imageUrl);
      fs.unlink(filePath, error => {
        if (error) return console.log(error);
      });
      return User.destroy({ where: { id } })
    })
    .then((result) => {
      res.status(200).json({
        message: `User with ID ${req.params.id} is DELETED`,
        data: result,
      })
    })
    .catch(error => console.log(error));
}