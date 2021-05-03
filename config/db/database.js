require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      },
    },
    timezone: '+07:00', // for writing to database
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      },
    },
    timezone: '+07:00', // for writing to database
  }
}
