// autoController.js

const { conn } = require('../config/conn');
const Auto = require('../models/Auto');

async function obtenerTodos(req, res) {
  try {
    const [rows] = await conn.query('SELECT * FROM autos');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los autos:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function agregarAuto(req, res) {
   //const nuevoAuto = new Auto(req.body.marca, req.body.modelo, req.body.año, req.body.color, req.body.tipoCombustible, req.body.kilometraje, req.body.transmision, req.body.precio, req.body.puertas, req.body.tipoMotor);

  const { marca, modelo, año, color, tipoCombustible, kilometraje, transmision, precio, puertas, tipoMotor } = req.body;
  const nuevoAuto = new Auto(marca, modelo, año, color, tipoCombustible, kilometraje, transmision, precio, puertas, tipoMotor);

  try {
    const autoData = Object.values(nuevoAuto); 
    await conn.query('INSERT INTO autos (marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', autoData);
    res.status(201).json({ message: 'Auto agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function eliminarAuto(req, res) {
  const autoId = req.params.id;

  try {
    await conn.query('DELETE FROM autos WHERE id = ?', [autoId]);
    res.status(200).json({ message: 'Auto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function modificarAuto(req, res) {
  const autoId = req.params.id;
  const { marca, modelo, año, color, tipoCombustible, kilometraje, transmision, precio, puertas, tipoMotor } = req.body;
  const autoActualizado = new Auto(marca, modelo, año, color, tipoCombustible, kilometraje, transmision, precio, puertas, tipoMotor);

  try {
    const autoData = Object.values(autoActualizado);
    await conn.query('UPDATE autos SET marca = ?, modelo = ?, año = ?, color = ?, tipo_combustible = ?, kilometraje = ?, transmision = ?, precio = ?, puertas = ?, tipo_motor = ? WHERE id = ?', [...autoData, autoId]);
    res.status(200).json({ message: 'Auto modificado exitosamente' });
  } catch (error) {
    console.error('Error al modificar el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  obtenerTodos,
  agregarAuto,
  eliminarAuto,
  modificarAuto
};
