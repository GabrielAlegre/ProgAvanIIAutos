// app.js
const express = require('express');
const path = require('path'); 
const app = express();
const router = express.Router();
const autoApiRoutes = require('./src/routes/autosApiRoutes');
const autoRoutes = require('./src/routes/autosRoutes');
const authRoutes = require('./src/routes/authRoutes');
const autoController = require('./src/controllers/autoController');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const authMiddleware = require('./src/middlewares/authMiddleware');
require('dotenv').config();

// Configuración de express-session
app.use(session({
    secret: process.env.APP_PASS,
    resave: false,
    saveUninitialized: true
  }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './src/views');
// Configura el middleware method-override
app.use(methodOverride('_method'));
app.use(authMiddleware);
// app.get('/',  (req, res) => {
//     autoController.mostrarListado(req, res);
// });
app.get('/', (req, res, next) => {
    // Verificar si el usuario está logueado
    if (req.session && req.session.userId) {
        // Si está logueado, redirigir al listado de autos
        return res.redirect('/autos/listado');
    } else {
        // Si no está logueado, redirigir al login
        return res.redirect('/usuarios/login');
    }
});

// Rutas para los autos
app.use('/api', autoApiRoutes);
app.use('/autos', autoRoutes);
app.use('/usuarios', authRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} (http://localhost:${PORT})`);
});
