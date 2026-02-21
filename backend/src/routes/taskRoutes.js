const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    fetchExternalTasks
} = require('../controllers/taskController');

// Definición de rutas CRUD para las tareas
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/external', fetchExternalTasks); // Extra: obtener tareas de API externa

module.exports = router;
