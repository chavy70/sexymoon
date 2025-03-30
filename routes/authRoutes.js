const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para el login
router.post('/login', authController.login);

module.exports = router;

/*const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuarios');  // Asegúrate de importar el modelo de Usuario
const router = express.Router();

// Ruta para login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const user = await usuarios.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

        // Enviar el token en la respuesta
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

module.exports = router;*/
