const express = require('express');
const { userValidator, verifyToken, setMulter } = require('../config/middleware');
const { getAllUsers, getUserByID, userLogin, userRegister, userUpdated, userDeleted } = require('../controllers/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:token', verifyToken, getUserByID);
router.post('/login', userLogin)
router.post('/', userValidator, userRegister);
router.put('/:token', verifyToken, userValidator, userUpdated);
router.delete('/:token', verifyToken, userDeleted);

module.exports = router;