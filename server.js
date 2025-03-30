const express = require('express');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
app.use(cors());
// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});