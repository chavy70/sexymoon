const express = require('express');
const app = express();

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});