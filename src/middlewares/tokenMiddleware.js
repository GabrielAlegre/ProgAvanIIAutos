const { obtenerPayLoadDelJWT, ObtenerJWTDeCookie } = require('../services/jwtService');
const { logout } = require('../controllers/authController');
const verifyJWT = async (req, res, next) => {
    const token = ObtenerJWTDeCookie(req);
    if (!token) {
        return logout(req, res);
    }

    const { exito, data, error } = await obtenerPayLoadDelJWT(token); // Pasa el token directamente
    if (!exito) {
        console.log("Token inválido o expirado: ", error)
        return logout(req, res, "token");
    }
    req.user = data; 
    next();
};

module.exports = verifyJWT;
