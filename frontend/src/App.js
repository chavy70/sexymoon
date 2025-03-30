import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de que react-router-dom esté en versión 6
import Login from './components/Login';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.text())
      .then(data => setMensaje(data));
  }, []);

  return (
    <Router> 
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} /> {/* Usamos 'element' para renderizar el componente */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
