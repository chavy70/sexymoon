/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models'); // Asegúrate de importar tu modelo de usuario

// Función de autenticación (login)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`error 1 `+password);
    // Buscar el usuario por nombre de usuario
    const user = await Usuarios.findOne({ where: { username } });
    console.log(`error 2 `+user.password);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Comparar la contraseña ingresada con la contraseña almacenada (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`error 3 `+hashedPassword);
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
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('firebase-admin');
const { Usuarios } = require('../models'); // Asegúrate de importar tu modelo de usuario

// Inicializa Firebase Admin
const serviceAccount = require('../config/firebase-service-account.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Función de autenticación (login)
exports.login = async (req, res) => {
  const { username, password, firebaseToken } = req.body;

  try {
    if (firebaseToken) {
      // Si se proporciona un token de Firebase, validarlo
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
      const firebaseUserId = decodedToken.uid;
      const secretKey = `102072346ee9f8dff14436068bc9e9f0f9384b740c2f545df244c8d555ef0ed1901cc6b512c8006d1152594ed1d45e3f097c6df01bce3a505e798357f56339a5`;
      // Busca el usuario en la base de datos con el UID de Firebase
      let user = await Usuarios.findOne({ where: { firebaseUserId } });
      console.log(`firebaseUserId 1 `+firebaseUserId);
      if (!user) {
        console.log(`user firebaseUserId 2 `+decodedToken.email);
        user = await Usuarios.create({
          username: decodedToken.name || firebaseUserId, // Puedes elegir un nombre de usuario basado en el nombre de usuario de Firebase
          firebaseUserId: firebaseUserId,
          password: null,  // No es necesario almacenar una contraseña para el login de Firebase
          email: decodedToken.email
        });
        console.log("Usuario guardado correctamente:", user.toJSON());
        //console.log(`salir firebaseUserId 3 `+user);
        //return res.status(400).json({ message: 'Usuario no encontrado en la base de datos' });
      }

      // Generar un token JWT para el frontend
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '1h', // El token expirará en 1 hora
      });

      return res.json({ token });

    } else {
      // Si no se proporciona un token de Firebase, usar el método tradicional de login
      let user = await Usuarios.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, 'mi_clave_secreta', {
        expiresIn: '1h',
      });

      return res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor: ' + error });
  }
};
