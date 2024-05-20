// src/controllers/autoController.js
const autoService = require('../services/autoService');

async function obtenerTodos(req, res) {
  try {
    const autos = await autoService.obtenerTodos();
    res.status(200).json(autos);
  } catch (error) {
    console.error('Error al obtener los autos:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function obtenerAuto(req, res) {
  const autoId = req.params.id;
  try {
    const auto = await autoService.obtenerAutoPorId(autoId);
    if (!auto) {
      return res.status(404).json({ message: `Auto con id ${autoId} no encontrado` });
    }
    res.status(200).json(auto);
  } catch (error) {
    console.error('Error al obtener el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function agregarAuto(req, res) {
  const { marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;

  if (!marca || !modelo || !año || !color || !tipo_combustible || kilometraje===undefined || !transmision || !precio || !puertas || !tipo_motor) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await autoService.agregarAuto(req.body);
    res.status(201).json({ message: 'Auto agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function eliminarAuto(req, res) {
  const autoId = req.params.id;

  try {
    await autoService.eliminarAuto(autoId);
    res.status(200).json({ message: 'Auto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el auto:', error);
    res.status(404).json({ message: error.message });
  }
}

async function modificarAuto(req, res) {
  const autoId = req.params.id;
  const { marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor } = req.body;

  if (!marca || !modelo || !año || !color || !tipo_combustible || !kilometraje || !transmision || !precio || !puertas || !tipo_motor) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await autoService.modificarAuto(autoId, req.body);
    res.status(200).json({ message: 'Auto modificado exitosamente' });
  } catch (error) {
    console.error('Error al modificar el auto:', error);
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  obtenerTodos,
  obtenerAuto,
  agregarAuto,
  eliminarAuto,
  modificarAuto
};
