import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig.js';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Empleados = () => {
  // Estado para la lista de empleados
  const [empleados, setEmpleados] = useState([]);

  // Estado para los campos del formulario de nuevo empleado
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    puesto: '',
    correo: ''
  });

  // Estado para la búsqueda de empleados
  const [busqueda, setBusqueda] = useState('');

  // Estados para el modo edición
  const [editandoId, setEditandoId] = useState(null);
  const [editandoEmpleado, setEditandoEmpleado] = useState({
    nombre: '',
    puesto: '',
    correo: ''
  });

  // Referencia a la colección "empleados" en Firestore
  const empleadosCollection = collection(db, 'empleados');

  // Función para obtener todos los empleados desde Firestore
  const obtenerEmpleados = async () => {
    try {
      const snapshot = await getDocs(empleadosCollection);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmpleados(lista);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      toast.error('Error al obtener empleados');
    }
  };

  // Carga inicial de empleados
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // Función para agregar un nuevo empleado
  const agregarEmpleado = async () => {
    // Validación simple de campos
    if (!nuevoEmpleado.nombre || !nuevoEmpleado.puesto || !nuevoEmpleado.correo) {
      toast.warning('Todos los campos son obligatorios');
      return;
    }

    try {
      await addDoc(empleadosCollection, nuevoEmpleado);
      setNuevoEmpleado({ nombre: '', puesto: '', correo: '' });
      obtenerEmpleados();
      toast.success('Empleado agregado correctamente');
    } catch (error) {
      console.error('Error al agregar empleado:', error);
      toast.error('Error al agregar empleado');
    }
  };

  // Iniciar modo edición con los datos del empleado seleccionado
  const iniciarEdicion = (empleado) => {
    setEditandoId(empleado.id);
    setEditandoEmpleado({
      nombre: empleado.nombre,
      puesto: empleado.puesto,
      correo: empleado.correo
    });
  };

  // Guardar los cambios realizados en un empleado
  const guardarEdicion = async () => {
    try {
      const empleadoRef = doc(db, 'empleados', editandoId);
      await updateDoc(empleadoRef, editandoEmpleado);
      setEditandoId(null);
      setEditandoEmpleado({ nombre: '', puesto: '', correo: '' });
      obtenerEmpleados();
      toast.info('Empleado actualizado');
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      toast.error('Error al actualizar empleado');
    }
  };

  // Eliminar un empleado con confirmación
  const eliminarEmpleado = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este empleado?');
    if (!confirmacion) return;

    try {
      await deleteDoc(doc(db, 'empleados', id));
      obtenerEmpleados();
      toast.warn('Empleado eliminado');
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      toast.error('Error al eliminar empleado');
    }
  };

  // Filtrar empleados según búsqueda (nombre, correo o puesto)
  const empleadosFiltrados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    emp.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    emp.puesto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="p-6">
      <div className="mt-10">
        <h1 className="text-2xl font-semibold mb-4">Empleados</h1>
        <p className="mb-6 text-gray-700">
          Aquí puedes ver, agregar, editar o eliminar empleados.
        </p>

        {/* Campo de búsqueda */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o puesto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Formulario de nuevo empleado */}
        <div className="mb-6 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoEmpleado.nombre}
            onChange={e => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Puesto"
            value={nuevoEmpleado.puesto}
            onChange={e => setNuevoEmpleado({ ...nuevoEmpleado, puesto: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            value={nuevoEmpleado.correo}
            onChange={e => setNuevoEmpleado({ ...nuevoEmpleado, correo: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            onClick={agregarEmpleado}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar
          </button>
        </div>

        {/* Tabla de empleados */}
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Puesto</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.map(emp => (
              <tr key={emp.id}>
                {editandoId === emp.id ? (
                  // Modo edición activado
                  <>
                    <td className="border px-2 py-1">
                      <input
                        value={editandoEmpleado.nombre}
                        onChange={e => setEditandoEmpleado({ ...editandoEmpleado, nombre: e.target.value })}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        value={editandoEmpleado.puesto}
                        onChange={e => setEditandoEmpleado({ ...editandoEmpleado, puesto: e.target.value })}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        value={editandoEmpleado.correo}
                        onChange={e => setEditandoEmpleado({ ...editandoEmpleado, correo: e.target.value })}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1 text-center">
                      <button
                        onClick={guardarEdicion}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        className="text-red-600 hover:underline"
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  // Vista normal
                  <>
                    <td className="border px-4 py-2">{emp.nombre}</td>
                    <td className="border px-4 py-2">{emp.puesto}</td>
                    <td className="border px-4 py-2">{emp.correo}</td>
                    <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => iniciarEdicion(emp)}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarEmpleado(emp.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contenedor para mostrar los mensajes tipo toast */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </main>
  );
};

export default Empleados;
