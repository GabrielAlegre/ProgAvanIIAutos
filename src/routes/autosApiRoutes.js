const express = require('express');
const router = express.Router();
const autoApiController = require('../controllers/apiAutoController');


// Obtener todos los autos
router.get('/autos/obtenerTodos', autoApiController.obtenerTodos);

// Obtener un auto por su id
router.get('/auto/obtenerUno/:id', autoApiController.obtenerUno);

// Agregar un nuevo auto
router.post('/auto/crear', autoApiController.agregarAuto);

// Eliminar un auto por su ID
router.delete('/auto/eliminarAuto/:id', autoApiController.eliminarAuto);

// Modificar un auto por su ID
router.put('/auto/modificarAuto/:id', autoApiController.modificarAuto);

module.exports = router;
