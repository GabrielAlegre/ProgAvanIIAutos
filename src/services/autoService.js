const Auto = require('../models/Auto');

async function crearAuto(autoData) {
    try {
        const nuevoAuto = new Auto(autoData);
        await nuevoAuto.save();
        return { exito: true, auto: nuevoAuto };
    } catch (error) {
        console.error('Error al crear el auto:', error);
        return { exito: false, error };
    }
}

async function obtenerAutoPorId(id) {
    try {
        const auto = await Auto.findById(id);
        if (!auto) {
            return { exito: false, error: 'Auto no encontrado' };
        }
        return { exito: true, auto };
    } catch (error) {
        console.error('Error al obtener el auto:', error);
        return { exito: false, error };
    }
}

async function obtenerTodosLosAutos() {
    try {
        const autos = await Auto.find();
        return { exito: true, auto: autos };
    } catch (error) {
        console.error('Error al obtener los autos:', error);
        return { exito: false, error };
    }
}

async function actualizarAuto(id, autoData) {
    try {
        const auto = await Auto.findById(id);
        if (!auto) {
            return { exito: false, error: 'Auto no encontrado' };
        }
        Object.assign(auto, autoData);
        await auto.save();
        return { exito: true, auto };
    } catch (error) {
        console.error('Error al actualizar el auto:', error);
        return { exito: false, error };
    }
}

async function eliminarAuto(id) {
    try {
        const auto = await Auto.findById(id);
        if (!auto) {
            return { exito: false, error: 'Auto no encontrado' };
        }
        await Auto.findByIdAndDelete(id);
        return { exito: true };
    } catch (error) {
        console.error('Error al eliminar el auto:', error);
        return { exito: false, error };
    }
}

module.exports = {
    crearAuto,
    obtenerAutoPorId,
    obtenerTodosLosAutos,
    actualizarAuto,
    eliminarAuto
};
