const setBodyParser = require('./body-parser/setBodyParser')
const setMulter = require("./multer/setMulter");
const setCors = require('./cors-policy/cors-policy');
const { userRegisterValidator } = require('./validator/setValidator');

module.exports = { setBodyParser, setMulter, setCors, userRegisterValidator };