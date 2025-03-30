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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
