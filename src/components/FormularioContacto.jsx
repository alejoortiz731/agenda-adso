import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado de errores para cada campo  
  const [errores, setErrores] = useState({});

  // Estado para controlar el proceso de envío
  const [enviando, setEnviando] = useState(false);

  // Estado para errores de la API / servidor
  const [errorApi, setErrorApi] = useState(null);

  // Función de validación para los campos requeridos
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar Nombre
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Validar Teléfono (7 a 10 dígitos)
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{7,10}$/.test(form.telefono.trim())) {
      nuevosErrores.telefono = "Ingrese un número de teléfono válido (7 a 10 dígitos).";
    }

    // Validar Correo (presencia de @ y estructura correcta)
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(form.correo.trim())) {
      nuevosErrores.correo = "Ingrese un correo válido que contenga '@' y dominio.";
    }

    return nuevosErrores;
  };

  // Actualizar el estado de los inputs y limpiar errores al escribir
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Limpiar el error del campo actual mientras el usuario escribe
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
    if (errorApi) setErrorApi(null);
  };

  // Enviar datos
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorApi(null);

    // Ejecutar validaciones
    const erroresValidacion = validarFormulario();

    // Impedir el envío si existen errores de validación
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Activar estado 'enviando'
    setEnviando(true);

    try {
      // Petición asíncrona enviada al padre
      await onAgregar(form);

      // Reiniciar formulario tras éxito
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });
      setErrores({});
    } catch (error) {
      // Uso de la variable 'error' para evitar la advertencia de ESLint
      console.error("Error al registrar contacto:", error);
      
      // Manejo amigable del error de red/servidor (ej: JSON Server detenido)
      setErrorApi(
        "No fue posible conectar con el servidor. Por favor, verifica tu conexión e inténtalo de nuevo."
      );
    } finally {
      // Finalizar estado 'enviando'
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Mensaje de error amigable de la API */}
      {errorApi && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium">
          {errorApi}
        </div>
      )}

      {/* Grid: Nombre + Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input type="text" name="nombre" value={form.nombre} onChange={onChange} placeholder="Ej: Ana Pérez" className={`mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${ errores.nombre ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:ring-purple-500"
            }`}
          />
          {/* Mensaje de error renderizado condicionalmente */}
          {errores.nombre && (
            <p className="mt-1 text-xs text-red-600 font-semibold">
              {errores.nombre}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <input type="tel" name="telefono" value={form.telefono} onChange={onChange} placeholder="Ej: 3001234567" className={`mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${errores.telefono ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:ring-purple-500"
            }`}
          />
          {/* Mensaje de error renderizado condicionalmente */}
          {errores.telefono && (
            <p className="mt-1 text-xs text-red-600 font-semibold">
              {errores.telefono}
            </p>
          )}
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo *
        </label>
        <input type="email" name="correo" value={form.correo} onChange={onChange} placeholder="Ej: ana@sena.edu.co" className={`mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${errores.correo ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:ring-purple-500"
          }`}
        />
        {/* Mensaje de error renderizado condicionalmente */}
        {errores.correo && (
          <p className="mt-1 text-xs text-red-600 font-semibold">
            {errores.correo}
          </p>
        )}
      </div>

      {/* Etiqueta opcional */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Etiqueta (opcional)
        </label>
        <input type="text" name="etiqueta" value={form.etiqueta} onChange={onChange} placeholder="Ej: Trabajo" className="mt-1 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none p-3"
        />
      </div>

      {/* Botón Submit desactivado mientras envía */}
      <button type="submit" disabled={enviando} className={`w-full text-white font-semibold py-3 rounded-lg transition-colors ${ enviando ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}