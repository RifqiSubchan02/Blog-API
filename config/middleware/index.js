const setBodyParser = require('./body-parser/setBodyParser');
const setMulter = require("./multer/setMulter");
const setCors = require('./cors-policy/cors-policy');
const verifyToken = require('./auth/verifyToken');
const { userValidator, articleValidator } = require('./validator/setValidator');

module.exports = { setBodyParser, setMulter, setCors, userValidator, articleValidator, verifyToken };