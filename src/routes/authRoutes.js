const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

// Rutas para el CRUD de usuarios
router.post('/registro', userController.crearUsuario);
router.get('/registro', userController.mostrarFormularioRegistro);
router.post('/login', userController.login); // Nueva ruta para iniciar sesión
router.get('/login', userController.mostrarFormularioLogin);
router.get('/logout', userController.logout);
router.use((req, res) => {
    res.status(404).render('../views/404.ejs');
  });
module.exports = router;
