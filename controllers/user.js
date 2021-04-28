const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");
const { User } = require("../config/models");
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
  await User.findAll()
    .then((result) => {
      res.status(200).json({
        message: "Get All Users",
        data: result,
      });
    })
    .catch(error => console.error(error));
};

exports.getUserByID = async (req, res, next) => {
  const id_user = await req.user.id_user;
  await User.findByPk(id_user)
    .then((result) => {
      res.status(200).json({
        message: `Get User by ID ${id_user}`,
        data: result,
      })
    })
    .catch(error => console.error(error));
}

exports.userLogin = async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email, password: req.body.password } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Email or Password are wrong"
        })
      }
      const token = jwt.sign({ id_user: user.id_user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.status(200).json({ access_token: token });
    })
    .catch(error => console.error(error));
}

exports.userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    await User.create(
      {
        id_user: Math.round(Math.random().toPrecision(5) * 100000),
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        image: req.file.path,
        createdAt: Date(),
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

exports.userUpdated = async (req, res, next) => {
  const id_user = await req.user.id_user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid value', data: errors.array() });
  } else {
    if (!req.file) {
      await User.update(
        {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        },
        {
          where: {
            id_user: id_user,
          }
        }
      )
        .then((result) => {
          if (result == 0) {
            return res.status(400).json({
              message: `ID ${id_user} Not Found`
            })
          }
          res.status(200).json({
            message: `User with ID ${id_user} is UPDATED`,
          })
        })
        .catch(error => console.error(error));
    } else {
      await User.findByPk(id_user)
        .then(user => {
          const filePath = path.join(__dirname, '../', user.image);
          fs.unlink(filePath, error => {
            if (error) return console.log(error);
          });
          return User.update(
            {
              email: req.body.email,
              password: req.body.password,
              name: req.body.name,
              image: req.file.path,
            },
            {
              where: {
                id_user: id_user,
              }
            }
          )
        })
        .then((result) => {
          if (result == 0) {
            return res.status(400).json({
              message: `ID ${id_user} Not Found`
            })
          }
          res.status(200).json({
            message: `User with ID ${id_user} is UPDATED`,
          })
        })
        .catch(error => console.error(error));
    }
  }
}

exports.userDeleted = async (req, res, next) => {
  const id_user = await req.user.id_user;
  await User.findByPk(id_user)
    .then(user => {
      const filePath = path.join(__dirname, '../', user.image);
      fs.unlink(filePath, error => {
        if (error) return console.log(error);
      });
      return User.destroy({ where: { id_user: id_user } })
    })
    .then((result) => {
      res.status(200).json({
        message: `User with ID ${req.params.id_user} is DELETED`,
        data: result,
      })
    })
    .catch(error => console.log(error));
}