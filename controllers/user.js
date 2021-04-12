const db = require("../config/database/mysql");
const { User } = require("../config/models");

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
  await User.findByPk(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: `Get User by ID ${req.params.id}`,
        data: result,
      })
    })
    .catch(error => console.error(error));
}

exports.userLogin = async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email, password: req.body.password } })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          message: "Email or Password are wrong"
        })
      }
      res.status(200).json({
        message: `Welcome ${result.name}`,
        data: result,
      })
    })
    .catch(error => console.error(error));
}

exports.userRegister = async (req, res, next) => {
  await User.create(
    {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      image: req.body.image,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Register Success",
      })
    })
    .catch(error => console.error(error));
}

exports.userUpdated = async (req, res, next) => {
  await User.update(
    {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      image: req.body.image,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((result) => {
      if (result == 0) {
        return res.status(400).json({
          message: `ID ${req.params.id} Not Found`
        })
      }
      res.status(200).json({
        message: `User with ID ${req.params.id} is UPDATED`,
      })
    })
    .catch(error => console.error(error));
}

exports.userDeleted = async (req, res, next) => {
  await User.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: `User with ID ${req.params.id} is DELETED`,
        data: result,
      })
    })
    .catch(error => console.error(error));
}