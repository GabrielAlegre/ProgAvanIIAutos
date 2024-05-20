// src/services/autoService.js
const { conn } = require('../config/conn');
const Auto = require('../models/Auto');

async function obtenerTodos() {
    try {
        const [rows] = await conn.query('SELECT * FROM autos');
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los autos: ' + error.message);
    }
}

async function obtenerAutoPorId(autoId) {
    try {
        const [rows] = await conn.query('SELECT * FROM autos WHERE id = ?', [autoId]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener el auto: ' + error.message);
    }
}

async function agregarAuto(autoData) {
    const { marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = autoData;
    const nuevoAuto = new Auto(marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor);

    try {
        const autoValues = Object.values(nuevoAuto); 
        await conn.query('INSERT INTO autos (marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', autoValues);
    } catch (error) {
        throw new Error('Error al agregar el auto: ' + error.message);
    }
}

async function eliminarAuto(autoId) {
    try {
        const auto = await obtenerAutoPorId(autoId);
        if (!auto) {
            throw new Error(`El auto con id '${autoId}' no existe`);
        }
        await conn.query('DELETE FROM autos WHERE id = ?', [autoId]);
    } catch (error) {
        throw new Error('Error al eliminar el auto: ' + error.message);
    }
}

async function modificarAuto(autoId, autoData) {
    const { marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = autoData;
    const autoActualizado = new Auto(marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor);

    try {
        const auto = await obtenerAutoPorId(autoId);
        if (!auto) {
            throw new Error(`El auto con id ${autoId} no existe para modificarlo`);
        }
        const autoValues = Object.values(autoActualizado);
        await conn.query('UPDATE autos SET marca = ?, modelo = ?, año = ?, color = ?, tipo_combustible = ?, kilometraje = ?, transmision = ?, precio = ?, puertas = ?, tipo_motor = ? WHERE id = ?', [...autoValues, autoId]);
    } catch (error) {
        throw new Error('Error al modificar el auto: ' + error.message);
    }
}

module.exports = {
    obtenerTodos,
    obtenerAutoPorId,
    agregarAuto,
    eliminarAuto,
    modificarAuto
};
