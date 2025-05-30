import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Sistema de RH</h1>

      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:underline">Inicio</Link>
          <Link to="/dashboard/empleados" className="hover:underline">Empleados</Link>
          <Link to="/dashboard/perfil" className="hover:underline">Perfil</Link>
        </div>

        {currentUser && (
          <div className="flex items-center gap-2">
            <img
              src={currentUser.photoURL}
              alt="Perfil"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="text-sm">{currentUser.displayName}</span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded text-sm text-white"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
