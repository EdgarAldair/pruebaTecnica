const Task = require('../models/Task');
const axios = require('axios');

// @desc    Obtener todas las tareas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

// @desc    Crear nueva tarea
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al crear la tarea' });
    }
};

// @desc    Actualizar tarea existente
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) return res.status(404).json({ success: false, error: 'No se encontró la tarea' });
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al actualizar' });
    }
};

// @desc    Eliminar tarea
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ success: false, error: 'No se encontró la tarea' });
        res.json({ success: true, message: 'Tarea eliminada' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al eliminar' });
    }
};

// @desc    Consumir datos de API externa (Extra)
exports.fetchExternalTasks = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const externalTasks = response.data.map(t => ({
            title: `[EXTERNAL] ${t.title}`,
            completed: t.completed
        }));
        
        // Opcional: Guardarlas en la DB o solo devolverlas
        const savedTasks = await Task.insertMany(externalTasks);
        res.json({ success: true, data: savedTasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener tareas externas' });
    }
};
