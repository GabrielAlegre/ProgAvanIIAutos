const usuarioService = require('../services/usuarioService');
const JWTService = require('../services/jwtService');
//el controlador es lo más simple posible, Se encarga de recibir la solicitud, descomprimir los datos del req.body, llamar al servicio adecuado, y manejar la respuesta del servicio.
async function crearUsuario(req, res) {
    const { email, password } = req.body;
    const resp = await usuarioService.crearUsuario( email, password );

    if (resp.exito) {
        req.flash('success', '¡Registro exitoso! Por favor inicia sesión.');
        return res.redirect('/usuarios/login');
    } else {
        req.flash('error', 'Registro inválido');
        return res.redirect('/usuarios/registro');
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const resp = await usuarioService.login(email, password);

    if (resp.exito) {
        req.session.userId = resp.usuario.id;

        const tokenResponse = await JWTService.generarJWT({ id: resp.usuario.id, email: resp.usuario.email });
        if (tokenResponse.exito) {
            console.log("Guarde JWT en Cookie");
            JWTService.guardarJWTEnCookie(res, tokenResponse.data);
        }
        else{
            req.flash('error', 'No se pudo generar el token');
            return res.redirect('/usuarios/login');
        }

        // req.flash('success', '¡Bienvenido!');
        return res.redirect('/');
    } else {
        req.flash('error', resp.error);
        return res.redirect('/usuarios/login');
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

function logout(req, res, message) {
    // Verifica si hay una sesión activa
    if (req.session) {
        // Destruye la sesión y redirige al usuario a la página de inicio
        req.session.destroy(err => {
            if (err) {
                // Maneja el error de alguna manera, si es necesario
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error interno del servidor');
            }
            res.clearCookie('auth_token');
            console.log("Se destruyó la sesión y se borro la cookie con el token");
            if(message=="token")
            {
                return res.redirect(`/usuarios/login?message=${encodeURIComponent(message)}`);
            }
            else{
                return res.redirect(`/usuarios/login?message=${encodeURIComponent('cierra')}`);
            }

        });
    } else {
        // Si no hay sesión activa, simplemente redirige al usuario a la página de inicio de sesión
        return res.redirect('/usuarios/login');
    }
}



  module.exports = {
    login,
    crearUsuario,
    mostrarFormularioRegistro,
    mostrarFormularioLogin,
    logout
}
