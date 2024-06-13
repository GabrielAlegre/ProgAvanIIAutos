const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

//la encriptación de la contraseña es parte de la lógica de negocio y por lo tanto esta en el servicio
async function crearUsuario( email, password ) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ 'email': { $eq: email } });
        if (existingUser) {
            return { exito: false, error: 'Registro inválido' };
        }

        // Hash del password antes de guardarlo en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ email, password: hashedPassword });
        await usuario.save();

        return { exito: true, auto: usuario };
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return { exito: false, error };
    }
}

async function login(email, password) {
    try {
        const usuario = await Usuario.findOne({ 'email': { $eq: email } });
        if (!usuario) {
            return { exito: false, error: 'Credenciales inválidas' };
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return { exito: false, error: 'Credenciales inválidas' };
        }

        return { exito: true, usuario };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { exito: false, error: 'Error interno del servidor' };
    }
}

module.exports = {
    crearUsuario,
    login
};
