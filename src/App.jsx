import "./App.css";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Esta es nuestra "base de datos" inicial quemada en el código
  const contactos = [
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
    {
      id: 2,
      nombre: "Juan Díaz",
      telefono: "301 987 6543",
      correo: "juan@sena.edu.co",
      etiqueta: "Instructor",
    },
    {
      id: 3,
      nombre: "Luisa Martínez",
      telefono: "320 555 7788",
      correo: "luisa@sena.edu.co",
      etiqueta: "Cliente",
    },
    {
      id: 4,
      nombre: "Andés Deossa",
      telefono: "301 213 3457",
      correo: "Andres@sena.edu.co",
      etiqueta: "Instructor",
    },
    {
      id: 5,
      nombre: "Carlos Agudelo",
      telefono: "320 645 1235",
      correo: "carlos@sena.edu.co",
      etiqueta: "Cliente",
    },
    
  ];

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO 📒</h1>

      <p className="app-subtitle">Contactos guardados</p>

      {/* Recorremos el arreglo contactos y pintamos una tarjeta por cada uno */}
      {contactos.map((c) => (
        <ContactoCard
          key={c.id}            // key única para React
          nombre={c.nombre}     // prop nombre
          telefono={c.telefono} // prop telefono
          correo={c.correo}     // prop correo
          etiqueta={c.etiqueta} // prop etiqueta (Cliente, Instructor, etc.)
        />
      ))}

      <p className="app-nota">
        (Versión 0.1 - solo lectura, sin agregar ni editar todavía)
      </p>
    </main>
  );
}