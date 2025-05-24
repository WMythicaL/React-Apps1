export default function NavBar() {
  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Mi Sistema HR</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Inicio</a>
        <a href="#" className="hover:underline">Empleados</a>
        <a href="#" className="hover:underline">Perfil</a>
      </div>
    </nav>
  );
}
