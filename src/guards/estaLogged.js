


function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
      // Si el usuario está autenticado, permite el acceso a la siguiente ruta
      return next();
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      req.flash('error', 'Necesita iniciar sesion');

      return res.redirect('/usuarios/login');
    }
  }
  
  
  module.exports =  requireAuth ;
  