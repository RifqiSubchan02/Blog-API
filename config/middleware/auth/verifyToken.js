require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = verifyToken = (req, res, next) => {
  const access_token = req.params.token;
  try {
    const verified = jwt.verify(access_token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}