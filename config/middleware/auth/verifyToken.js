require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = verifyToken = (req, res, next) => {
  const accessToken = req.header('access-token');
  try {
    const verified = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}