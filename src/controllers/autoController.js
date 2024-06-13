const Auto = require('../models/Auto');
const autoService = require('../services/autoService');
mensajeExito="";

async function mostrarFormularioAlta(req, res) {
    try {
        return res.render('../views/autoAlta.ejs', { modificar: false });
    } catch (error) {
        return res.status(500).send('Error interno del servidor');
    }
}

async function mostrarFormularioModificacion(req, res) {
    const resp = await autoService.obtenerAutoPorId(req.params.id);

    if (resp.exito) {
        return res.render('../views/autoAlta.ejs', { modificar: true, auto: resp.auto });
    } else {
        return res.render('../views/404.ejs', { modificar: true, auto: resp.auto });
    }
}

async function formularioAltaPost(req, res) {
    const { marca, modelo, anio, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;
    const path_foto = req.file ? `/uploads/${req.file.filename}` : '';

    const nuevoAutoData = {
        marca,
        modelo,
        anio,
        color,
        tipo_combustible,
        kilometraje,
        transmision,
        precio,
        puertas,
        tipo_motor,
        path_foto
    };

    const resp = await autoService.crearAuto(nuevoAutoData);

    if (resp.exito) {
        const mensajeExito = '¡El auto se agregó exitosamente!';
        return res.render('../views/autoAlta.ejs', { modificar: false, mensajeExito, mostrarMensaje: true });
    } else {
        console.error(resp.error);
        return res.status(500).send('Error interno del servidor');
    }
}

async function modificarAuto(req, res) {
    const { marca, modelo, anio, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;
    const path_foto = req.file ? `/uploads/${req.file.filename}` : undefined;

    const autoData = {
        marca,
        modelo,
        anio,
        color,
        tipo_combustible,
        kilometraje,
        transmision,
        precio,
        puertas,
        tipo_motor
    };

    if (path_foto) {
        autoData.path_foto = path_foto;
    }

    const resp = await autoService.actualizarAuto(req.params.id, autoData);

    if (resp.exito) {
        const mensajeExito = '¡El auto se modificó exitosamente!';
        return res.render('../views/autoAlta.ejs', { modificar: true, auto: resp.auto, mensajeExito, mostrarMensaje: true });
    } else {
        console.error(resp.error);
        if (resp.error === 'Auto no encontrado') {
            return res.status(404).send('Auto no encontrado');
        }
        return res.status(500).send('Error interno del servidor');
    }
}


async function mostrarListado(req, res) {
    const resp = await autoService.obtenerTodosLosAutos();

    if (resp.exito) {
        return res.render('../views/autosListado.ejs', { autos: resp.auto });
    } else {
        console.error('Error al obtener los autos:', resp.error);
        return res.status(500).send('Error interno del servidor');
    }
}

async function eliminarAuto(req, res) {
    const resp = await autoService.eliminarAuto(req.params.id);

    if (resp.exito) {
        return res.status(200).json({ message: 'Auto eliminado exitosamente' });
    } else {
        console.error('Error al eliminar el auto:', resp.error);
        if (resp.error === 'Auto no encontrado') {
            return res.status(404).send('Auto no encontrado');
        }
        return res.status(500).send('Error interno del servidor');
    }
}



module.exports = {
    mostrarFormularioAlta,
    formularioAltaPost,
    mostrarListado,
    modificarAuto,
    mostrarFormularioModificacion,
    eliminarAuto
}