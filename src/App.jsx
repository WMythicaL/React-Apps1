import NavBar from "./components/Navbar";
import Mensaje from "./components/Mensaje";

function App() {
  return (
    <div>
      <NavBar />
      <main className="max-w-4xl mx-auto p-4 mt-6 bg-white shadow rounded">
        <Mensaje texto="Bienvenido al Sistema HR" />
      </main>
    </div>
  );
}

export default App;