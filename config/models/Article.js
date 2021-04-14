const { DataTypes } = require('sequelize');
const database = require('../database/mysql');

const Article = database.define('article',
  {
    id_article: { type: DataTypes.INTEGER, primaryKey: true },
    id_user: DataTypes.INTEGER,
    id_category: DataTypes.STRING,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    body: DataTypes.STRING,
    status: DataTypes.TINYINT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Article;