const { SignJWT, jwtVerify } = require('jose');
const { v4: uuidv4 } = require('uuid');

const jwtKey = String(process.env.JWT_PRIVATE_KEY);

const generarJWT = async ({ id, email }) => {
    try {
        if (!id) { throw new Error('No tenemos el id del usuario'); }
        if (!email) { throw new Error('No tenemos el email del usuario'); }

        //Creo una instancia de SignJWT con el payload { id, email }. Este payload será el contenido del JWT, conteniendo la identificación del usuario y su email.
        const jwtConstructor = new SignJWT({ id, email });
        const encoder = new TextEncoder();
        //Configuración del JWT:
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("10s")
            .sign(encoder.encode(jwtKey));
            console.log('JWT generado:', jwt);
        return { data: jwt,  exito: true };
    } catch (error) {
        return {  exito: false, error };
    }
};

const obtenerPayLoadDelJWT = async (token) => {
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(token, encoder.encode(jwtKey));
        return { exito: true, data: payload };
    } catch (error) {
        return { exito: false, error };
    }
};

const guardarJWTEnCookie = (res, token) => {
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict' // la cookie se envía solo en peticiones desde el mismo sitio
    });
};

const ObtenerJWTDeCookie = (req) => {
    const token = req.cookies.auth_token;
    return token || '';
};

module.exports = {
    generarJWT,
    obtenerPayLoadDelJWT,
    guardarJWTEnCookie,
    ObtenerJWTDeCookie
};
