const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const autoSchema = new Schema({
    // id: {
    //   type: Number,
    //   autoIncrement: true, // Nota: Requiere el uso del plugin para manejar auto-incremento
    //   primaryKey: true,   // En Mongoose, 'primaryKey' no se utiliza directamente, solo 'unique' y '_id'
    // },
    marca: {
      type: String,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    anio: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    tipo_combustible: {
      type: String,
      required: true,
    },
    kilometraje: {
      type: Number,
      required: true,
    },
    transmision: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    puertas: {
      type: Number,
      required: true,
    },
    tipo_motor: {
      type: String,
      required: true,
    },
    path_foto: {
      type: String,
      required: false,
    },
  }, {
    collection: 'autos',  // Nombre de la colección en la base de datos
    timestamps: false,
    versionKey: false
  });

  const Auto = mongoose.model('Auto', autoSchema);

  module.exports = Auto;
