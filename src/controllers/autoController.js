const Auto = require('../models/Auto');
mensajeExito="";
//para proxima clase crud completo y en la raiz el listado
async function mostrarFormularioAlta(req, res)
{
    try{
        return res.render('../views/autoAlta.ejs', {modificar:false});
    } catch(error){
        return res.status(500).send('Errer interno del servidor');
    }
}

async function mostrarFormularioModificacion(req, res) {
    try {
        const auto = await Auto.findByPk(req.params.id);
        if (!auto) {
            // return res.status(404).send('Auto no encontrado');
            return res.render('../views/404.ejs', { modificar: true, auto });

        }
        return res.render('../views/autoAlta.ejs', { modificar: true, auto });
    } catch (error) {
        return res.status(500).send('Error interno del servidor');
    }
}

async function formularioAltaPost(req, res)
{
    try{
        const { marca, modelo, anio, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;
        const path_foto = req.file ? `/uploads/${req.file.filename}` : '';

        const nuevoAuto = {
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
        console.log(nuevoAuto);
        const autoAx = await Auto.create(nuevoAuto);
        const mensajeExito = '¡El auto se agrego exitosamente!';
        return res.render('../views/autoAlta.ejs', {modificar:false, mensajeExito, mostrarMensaje: true});
    } catch(error){
        console.log({error})
        return res.status(500).send('Errer interno del servidor');
    }
}

async function modificarAuto(req, res) {
    try {
        const auto = await Auto.findByPk(req.params.id);
        if (!auto) {
            return res.status(404).send('Auto no encontrado');
        }

        const { marca, modelo, anio, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;
        const path_foto = req.file ? `/uploads/${req.file.filename}` : auto.path_foto;
        const nuevoAuto = { marca, modelo, anio, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor, path_foto
        };
        
        await auto.update(nuevoAuto);
        const mensajeExito = '¡El auto se modificó exitosamente!';
        return res.render('../views/autoAlta.ejs', { modificar: true, auto, mensajeExito, mostrarMensaje: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
}


async function mostrarListado(req, res) {
    try {
        const autos = await Auto.findAll();
        res.render('../views/autosListado.ejs', { autos });
    } catch (error) {
        console.error('Error al obtener los autos:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function eliminarAuto(req, res) {
    const id = req.params.id;
    try {
        const autoExiste = await Auto.findByPk(id);
        if (!autoExiste) {
            return res.status(404).send('Auto no encontrado');
        }
        await Auto.destroy({ where: { id } });
        res.status(200).json({ message: 'Auto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el auto:', error);
        res.status(500).send('Error interno del servidor');
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