const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/conn');

class Auto extends Model {}

Auto.init(
  {
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    año: {
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
  },
  {
    sequelize,
    modelName: 'Auto',
    timestamps: false
  }
);

module.exports = Auto;
