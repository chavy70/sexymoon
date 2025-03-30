import React from "react";
import { motion } from "framer-motion";
import BackgroundStars from "../components/BackgroundStars";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
         <BackgroundStars />
      <h1>Bienvenido al Dashboard de SexyMoon</h1>
      <p>Has iniciado sesión correctamente!</p>
      <motion.img
        style={{ width: 500 }} 
        src="images/logo-entero-blanco.png"
        alt="Logo"
        className="logo"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.5 }} 
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default Dashboard;
