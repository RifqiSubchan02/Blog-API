const express = require('express');
const { userValidator, verifyToken } = require('../config/middleware');
const { getAllUsers, getUserByID, userLogin, userRegister, userUpdated, userDeleted } = require('../controllers/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/get-id', verifyToken, getUserByID);
router.post('/login', userLogin);
router.post('/register', userValidator, userRegister);
router.put('/update', verifyToken, userValidator, userUpdated);
router.delete('/delete', verifyToken, userDeleted);

module.exports = router;