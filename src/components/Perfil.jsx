import React from 'react';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  const { currentUser } = useAuth();

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">Perfil del Usuario</h1>
      <p className="mt-4 text-gray-700">Información personal:</p>

      <div className="mt-6 inline-block text-left bg-white shadow p-6 rounded border">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={currentUser?.photoURL}
            alt="Foto de perfil"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <p><strong>Nombre:</strong> {currentUser?.displayName}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
