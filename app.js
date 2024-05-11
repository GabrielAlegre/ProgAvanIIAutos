// app.js
const express = require('express');
const app = express();
const autoRoutes = require('./src/routes/autosRoutes');
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hola'); // Renderiza el archivo home.ejs
});

// Rutas para los autos
app.use('/api', autoRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} (http://localhost:${PORT})`);
});
