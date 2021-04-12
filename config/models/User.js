const { DataTypes } = require('sequelize');
const database = require('../database/mysql');
require('dotenv').config();

const User = database.define(process.env.DB_TABLE_USER,
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;