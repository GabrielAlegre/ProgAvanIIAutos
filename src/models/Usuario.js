const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const usuarioSchema = new Schema({
    // id: {

    //     // type: Number,
    //     // autoIncrement: true, // Nota: Mongoose no soporta autoIncrement de forma nativa, hay que usar un plugin
    //     // primaryKey: true,   // Nota: En Mongoose, 'primaryKey' no se utiliza directamente.
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'usuarios',  // Nombre de la colección en la base de datos
    timestamps: false,
    versionKey: false
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;