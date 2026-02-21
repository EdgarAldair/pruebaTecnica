const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser); // Nueva ruta para el candidato
router.delete('/:id', userController.deleteUser);

module.exports = router;
