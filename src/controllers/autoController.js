// autoController.js

const { conn } = require('../config/conn');
const Auto = require('../models/Auto');


async function obtenerUno(req, res) {
    try {
        const id = req.params.id;
      const auto = await Auto.findByPk(id);
      if (auto === null) {
        throw new Error("No existe el auto con el id: "+ id)
      }
      res.status(200).json(auto);
    } catch (error) {
      console.error('Error al obtener los autos:', error);
      res.status(500).send({error:error.message});
    }
  }

async function obtenerTodos(req, res) {
  try {
    const autos = await Auto.findAll();
    res.status(200).json(autos);
  } catch (error) {
    console.error('Error al obtener los autos:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function agregarAuto(req, res) {

  try {
    const autoAx = await Auto.create(req.body)
    const {id, ...auto} = autoAx.dataValues; 

    res.status(201).json({ message: 'Auto agregado exitosamente', auto });
  } catch (error) {
    console.error('Error al agregar el auto:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function eliminarAuto(req, res) {
  const id = req.params.id;
  try {
    const autoExiste = await Auto.findByPk(id);
    if (autoExiste === null) {
      throw new Error("No eliminar ya que NO existe el auto con el id: "+ id)
    }
    await Auto.destroy({ where: {id}});
    res.status(200).json({ message: 'Auto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el auto:', error);
    res.status(500).send({error:error.message});
  }
}

async function modificarAuto(req, res) {
    try {
        const id = req.params.id;
        const autoExiste = await Auto.findByPk(id);
        if (autoExiste === null) {
          throw new Error("No existe el auto con el id: "+ id)
        }
        const auto =  await Auto.update(req.body,{where: {id},}); 
        if(auto[0]=!0){
            res.status(200).json({ message: 'Auto modificado exitosamente'});
        }{
            res.status(200).json({ message: 'No se realizo la modificacion del auto con el id:' + id});
        }
  } catch (error) {
    console.error('Error al modificar el auto:', error);
    res.status(500).send({error:error.message});
  }
}

module.exports = {
  obtenerTodos,
  agregarAuto,
  eliminarAuto,
  modificarAuto,
  obtenerUno
};
