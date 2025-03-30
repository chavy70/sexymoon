import { initializeApp } from "firebase/app";
import 'firebase/auth';  // Asegúrate de importar auth para usar la autenticación
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyC08gZ0gdhCjU1MQitairg3aWhxzDgOjEI",
    authDomain: "sexymoon-ca5a9.firebaseapp.com",
    projectId: "sexymoon-ca5a9",
    storageBucket: "sexymoon-ca5a9.firebasestorage.app",
    messagingSenderId: "559024118212",
    appId: "1:559024118212:web:e991cfbff9b19a1f99ec91",
    measurementId: "G-GSV6XCPRMB"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Funciones para login
const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

export { auth, signInWithGoogle, signInWithFacebook };
