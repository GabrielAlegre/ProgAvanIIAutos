const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');

// Obtener todos los autos
router.get('/autos/obtenerTodos', autoController.obtenerTodos);

// Agregar un nuevo auto
router.post('/auto/crear', autoController.agregarAuto);

// Eliminar un auto por su ID
router.delete('/auto/eliminarAuto/:id', autoController.eliminarAuto);

// Modificar un auto por su ID
router.put('/auto/modificarAuto/:id', autoController.modificarAuto);

module.exports = router;
