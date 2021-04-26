const express = require('express');
const { userRegisterValidator } = require('../config/middleware');
const { getAllUsers, getUserByID, userLogin, userRegister, userUpdated, userDeleted } = require('../controllers/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id_user', getUserByID);
router.post('/login', userLogin)
router.post('/', userRegisterValidator, userRegister);
router.put('/:id_user', userUpdated);
router.delete('/:id_user', userDeleted);

module.exports = router;