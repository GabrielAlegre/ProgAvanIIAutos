// src/models/Auto.js
class Auto {
    constructor(marca, modelo, año, color, tipo_combustible, kilometraje, transmision, precio, puertas, tipo_motor) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.color = color;
        this.tipo_combustible = tipo_combustible;
        this.kilometraje = kilometraje;
        this.transmision = transmision;
        this.precio = precio;
        this.puertas = puertas;
        this.tipo_motor = tipo_motor;
    }
}


module.exports = Auto;
