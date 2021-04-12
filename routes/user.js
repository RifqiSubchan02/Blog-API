const express = require('express');
const { getAllUsers, getUserByID, userLogin, userRegister, userUpdated, userDeleted } = require('../controllers/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/login', userLogin)
router.post('/', userRegister);
router.put('/:id', userUpdated);
router.delete('/:id', userDeleted);

module.exports = router;