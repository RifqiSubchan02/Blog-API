'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.belongsTo(models.User, { foreignKey: 'userId' });
      models.Article.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  };
  Article.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};