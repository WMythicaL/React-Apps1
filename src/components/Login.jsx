import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-700 mb-8 tracking-wide drop-shadow-sm">Sistema de RH</h1>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Inicio de sesión</h1>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:shadow-lg transition duration-300 mx-auto"
        >
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-18.7-1.6-37.2-4.8-55.3H272v104.7h147.5c-6.4 34.4-25.7 63.5-54.6 83.1l88 68.6c51.5-47.5 80.6-117.6 80.6-201.1z"/>
            <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.4 180.6-66.2l-88-68.6c-24.4 16.4-55.6 26-92.6 26-71.3 0-131.7-48.1-153.3-112.7l-89.9 69.4c43.3 85.4 132.3 151.1 243.2 151.1z"/>
            <path fill="#FBBC05" d="M118.7 323.8C112 307.4 108.3 289.2 108.3 270s3.7-37.4 10.4-53.8l-89.9-69.4C9.3 180.2 0 223.8 0 270s9.3 89.8 28.8 123.2l89.9-69.4z"/>
            <path fill="#EA4335" d="M272 107.6c39.8 0 75.7 13.7 104 40.6l78-78C411.8 25.4 350 0 272 0 161.1 0 72.1 65.7 28.8 146.8l89.9 69.4C140.3 155.7 200.7 107.6 272 107.6z"/>
          </svg>
          Iniciar sesión con Google
        </button>
        <p className="mt-4 text-sm text-gray-500">powered by Diego Manuel Pérez Estrella</p>
      </div>
    </div>
  );
};

export default Login;
