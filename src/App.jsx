import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Empleados from './components/Empleados';
import Perfil from './components/Perfil';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="empleados" element={<Empleados />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
  );
}

export default App;
