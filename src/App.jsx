import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId,
} from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Estado principal de la app 
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar la lista desde la API al iniciar la app (GET)
  useEffect(() => {
    async function cargarContactos() {
      try {
        setError("");
        const data = await listarContactos();  // GET a la API 
        setContactos(data);  // Guardamos en estado 
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  // Agregar contacto usando la API (POST) 
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo); // POST a la API 
      setContactos((prev) => [...prev, creado]); // Actualizamos estado 
      return creado;
    } catch (error) {
      console.error("Error al agregar contacto en App:", error);
      // Relanzamos el error para que FormularioContacto lo capture en su try/catch
      throw error;
    }
  };

  // Eliminar contacto usando la API (DELETE) 
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id); // DELETE en la API 
      setContactos((prev) => prev.filter((c) => c.id !== id)); // Quitamos del estado 
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el contacto");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Programa ADSO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          Agenda ADSO v6
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión de contactos con validaciones UX y conexión a API local.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Mensajes de estado global */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario para agregar contactos */}
        <FormularioContacto onAgregar={agregarContacto} />

        {/* Lista de contactos */}
        <div className="space-y-4">
          {contactos.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">
              No hay contactos aún. Agrega el primero usando el formulario.
            </p>
          )}

          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => eliminarContacto(c.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}