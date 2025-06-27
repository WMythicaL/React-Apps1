import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === '/dashboard';

  return (
    <div>
      <Navbar />
      <main className="p-6">
        {isHome && (
          <div className="mt-10">
            <h1 className="text-2xl font-semibold">
              Bienvenido, {currentUser?.displayName}
            </h1>
            <p className="mt-4 text-gray-700">
              Esta es la página principal. Usa la barra de navegación para acceder a otras secciones.
            </p>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;