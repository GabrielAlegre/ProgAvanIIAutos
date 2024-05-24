const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');
const upload = require('../config/multerConfig');
const  requireAuth  = require('../guards/estaLogged');

router.get('/listado', requireAuth, autoController.mostrarListado);
router.get('/alta', requireAuth, autoController.mostrarFormularioAlta);
router.post('/alta', upload.single('foto'), autoController.formularioAltaPost);
router.get('/modificar/:id', requireAuth, autoController.mostrarFormularioModificacion);
router.put('/modificar/:id', upload.single('foto'), autoController.modificarAuto);
router.delete('/eliminar/:id', autoController.eliminarAuto);

router.use((req, res) => {
    res.status(404).render('../views/404.ejs');
  });
module.exports = router;
