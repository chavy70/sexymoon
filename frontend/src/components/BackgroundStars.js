/*import React from "react";
import { motion } from "framer-motion";

const generateStars = (numStars) => {
  return Array.from({ length: numStars }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth, // Posición aleatoria en X
    y: Math.random() * window.innerHeight, // Posición aleatoria en Y
    size: Math.random() * 4 + 1, // Tamaño aleatorio
    delay: Math.random() * 5, // Retraso de animación aleatorio
    duration: Math.random() * 10 + 5, // Duración de la animación
  }));
};

const stars = generateStars(100); // Número de estrellas

const BackgroundStars = () => {
  return (
    <div className="background-stars">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0], // Brilla y desaparece
            y: [star.y, star.y - 10, star.y], // Pequeño movimiento
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay,
          }}
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
*/
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateStars = (numStars) => {
  return Array.from({ length: numStars }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5,
  }));
};

const generateShootingStars = (numShootingStars) => {
  return Array.from({ length: numShootingStars }).map((_, i) => ({
    id: `shooting-${i}`,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight * 0.5, // Aparecen en la parte superior
    delay: Math.random() * 15, // Aparecen en distintos momentos
    duration: Math.random() * 2 + 1, // Movimiento rápido
  }));
};

const BackgroundStars = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(200)); // Más estrellas
    setShootingStars(generateShootingStars(5)); // Pocas estrellas fugaces
  }, []);

  return (
    <div className="background-stars">
      {/* Estrellas normales */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0.2, 1, 0], // Brilla de forma irregular
            y: [star.y, star.y - 5, star.y], // Pequeño movimiento
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay,
          }}
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
        />
      ))}

      {/* Estrellas fugaces */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="shooting-star"
          initial={{ opacity: 0, x: star.x, y: star.y }}
          animate={{
            opacity: [0, 1, 0],
            x: [star.x, star.x + 200], // Movimiento rápido hacia la derecha
            y: [star.y, star.y + 100], // Movimiento diagonal descendente
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
