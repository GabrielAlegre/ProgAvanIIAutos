const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // Importa el modelo de usuario definido en Sequelize

  // Crear un nuevo usuario
  async function crearUsuario(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) {
        req.flash('error', 'Registro invalido');
        return res.redirect('/usuarios/registro'); // Redirige a la misma página actual
      }
      
      // Hash del password antes de guardarlo en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario en la base de datos
      const newUser = await Usuario.create({
        email,
        password: hashedPassword,
      });

     req.flash('success', '¡Registro exitoso! Por favor inicia sesión.');
      
        res.redirect('/usuarios/login');
  
    //   return res.status(200).json("te registraste");
    } catch (error) {
        req.flash('error', 'Error en el servidor');
      console.error('Error al crear usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  // Obtener todos los usuarios
  async function obtenerUsuarios(req, res) {
    try {
      const users = await Usuario.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  // Obtener un usuario por su ID
  async function obtenerUsuarioPorSuId(req, res) {
    try {
      const userId = req.params.id;
      const user = await Usuario.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async function login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar el usuario por su correo electrónico
      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        req.flash('error', 'Credenciales inválidas');
        return res.redirect('/usuarios/login');
      }

      // Verificar si la contraseña es correcta
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        req.flash('error', 'Credenciales inválidas');
        return res.redirect('/usuarios/login'); 
      }

      // Iniciar sesión (puedes almacenar información adicional en req.session si lo deseas)
      req.session.userId = user.id;
      req.flash('success', '¡Bienvenido!.');
    //   return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    return res.redirect('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async function mostrarFormularioRegistro(req, res)
{
    try{
        return res.render('../views/registro.ejs');
    } catch(error){
        return res.status(500).send('Errer interno del servidor');
    }
}
async function mostrarFormularioLogin(req, res)
{
    try{
        return res.render('../views/login.ejs');
    } catch(error){
        return res.status(500).send('Errer interno del servidor');
    }
}

function logout(req, res) {
    // Verifica si hay una sesión activa
    if (req.session) {
        // Destruye la sesión y redirige al usuario a la página de inicio
        req.session.destroy(err => {
            if (err) {
                // Maneja el error de alguna manera, si es necesario
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error interno del servidor');
            }
            return res.redirect('/usuarios/login');
        });
    } else {
        // Si no hay sesión activa, simplemente redirige al usuario a la página de inicio de sesión
        return res.redirect('/usuarios/login');
    }
}


  module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorSuId,
    login,
    crearUsuario,
    mostrarFormularioRegistro,
    mostrarFormularioLogin,
    logout
}
