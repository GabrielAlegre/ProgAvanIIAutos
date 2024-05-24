const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/conn');

class Auto extends Model {}

Auto.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_combustible: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kilometraje: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transmision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_motor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path_foto: {
        type: DataTypes.STRING,
      allowNull: true,

      },
  },
  {
    sequelize,
    modelName: 'Auto',
    timestamps: false
  }
);

module.exports = Auto;
