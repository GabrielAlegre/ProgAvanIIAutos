// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnections:true,
//     connectionLimit:10,
//     queueLimit: 0,
// });

// module.exports = {
//     conn: pool.promise()
// }
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0, // Número mínimo de conexiones en el pool
      acquire: 30000, // Tiempo máximo, en milisegundos, que el pool intentará obtener la conexión antes de lanzar un error
      idle: 10000 // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva en el pool antes de ser liberada
    }
  }
);

module.exports = sequelize;
