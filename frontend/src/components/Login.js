/*import React, { useState } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const history = useHistory();
  const navigate = useNavigate(); // ✅ Usamos useNavigate en lugar de useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Si la autenticación es exitosa, guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir a la página de inicio después del login
      //history.push('/dashboard'); // O a la página que desees
      navigate('/dashboard'); // ✅ Reemplazamos history.push() por navigate()

    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
*/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import BackgroundStars from "../components/BackgroundStars";
//import firebase from '../firebase'; // Asegúrate de importar Firebase
import { signInWithGoogle, signInWithFacebook } from '../firebase';
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleGoogleLogin = async () => {
    try {
      // Llamar a la función signInWithGoogle importada desde firebase.js
      const result = await signInWithGoogle();
  
      // Obtener el token de Firebase
      const firebaseToken = await result.user.getIdToken();
  
      // Enviar el token al backend para validación
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        firebaseToken: firebaseToken,
      });
  
      // Guardar el token JWT recibido del backend
      localStorage.setItem('token', response.data.token);
  
      // Redirigir al dashboard después de un inicio de sesión exitoso
      navigate('/dashboard');
    } catch (err) {
      console.error("Error en inicio de sesión con Google: ", err);
      setError('Error al iniciar sesión con Google');
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithFacebook();
      const firebaseToken = await result.user.getIdToken();

      // Enviar el token al backend para validación
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        firebaseToken: firebaseToken,
      });

      // Guardar el token JWT recibido del backend
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error en inicio de sesión con Facebook: ", err);
      setError('Error al iniciar sesión con Facebook');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirigir al dashboard después del login exitoso
      navigate('/dashboard');

    } catch (err) {
      // Capturar y mostrar el mensaje de error desde el backend
      setError(err.response?.data?.message || 'Error al iniciar sesión '+err);
    }
  };

  return (
    <div className="login-container">
        <BackgroundStars />

    <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
      <motion.img
        style={{ width: 500 }} 
        src="images/logo-entero-blanco.png"
        alt="Logo"
        className="logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 vidrio-empanhado">
        <form onSubmit={handleSubmit}>
          <div data-mdb-input-init class="form-outline mb-4">
          <label class="form-label" for="form1Example13">Usuario</label>
            <input
            className="form-control form-control-lg" 
            placeholder="Ingresar Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
           
          </div>

          <div data-mdb-input-init class="form-outline mb-4">
          <label class="form-label" for="form1Example23">Contraseña</label>
            <input
            type="password"
            className="form-control form-control-lg" 
            placeholder="Ingresar Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

            
          </div>

          <div class="d-flex justify-content-around align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label class="form-check-label" for="form1Example3"> Recordar </label>
            </div>
            <a href="#!">Olvido su contraseña?</a>
          </div>
          <div class="d-flex justify-content-around align-items-center mb-4">
          {error && <div style={{ color:"rgba(255, 0, 0, 0.5)" }}  className="error-message">{error}</div>}
          </div>
<div class="d-flex justify-content-around align-items-center mb-4">

<button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block">Ingresar</button>

</div>
          

        </form>
      </div>
    </div>
  </div>
</section>





    </div>




  );
};

export default Login;
