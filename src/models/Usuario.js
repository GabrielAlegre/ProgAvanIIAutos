const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/conn');


class Usuario extends Model {}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: false,
    }
);

module.exports = Usuario;
