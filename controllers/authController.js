const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/usuarios'); // Asegúrate de importar tu modelo de usuario

// Función de autenticación (login)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la contraseña almacenada (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'mi_clave_secreta', {
      expiresIn: '1h' // El token expirará en 1 hora
    });

    // Enviar la respuesta con el token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el 5555 servidor '+error });
  }
};
