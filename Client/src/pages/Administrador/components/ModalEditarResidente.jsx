import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEdit } from "react-icons/md";

const initialState = {
  nombre: "",
  apellido: "",
  rut: "",
  email: "",
  telefono: "",
  casa: "",
  es_representante: false,
  activo: true,
};

const ModalEditarResidente = ({ isOpen, onClose, onSuccess, residente }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (residente) {
      setForm({
        nombre: residente.nombre || "",
        apellido: residente.apellido || "",
        rut: residente.rut || "",
        email: residente.email || "",
        telefono: residente.telefono || "",
        casa: residente.casa || "",
        es_representante: !!residente.es_representante,
        activo: !!residente.activo,
      });
    }
  }, [residente, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "casa") {
      const val = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      setForm((prev) => ({ ...prev, [name]: val }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
       const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;
                    
      const response = await fetch(`${URL}/api/v1/residentes/update-residente/${residente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          rut: form.rut,
          email: form.email,
          telefono: form.telefono,
          casa: form.casa,
          es_representante: form.es_representante,
          activo: form.activo,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al actualizar residente");
        setLoading(false);
        return;
      }
      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError("Error inesperado al actualizar residente");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-2"
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center"><MdEdit className="inline-block mb-1 text-indigo-700" /> Editar Residente</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">RUT</label>
                <input
                  type="text"
                  name="rut"
                  value={form.rut}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  maxLength={12}
                  placeholder="+56 9 9525 9523"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Casa</label>
                <div className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700">
                  {form.casa}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="es_representante"
                  checked={form.es_representante}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer accent-indigo-600"
                />
                <label className="text-sm font-medium cursor-pointer">Es representante</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="activo"
                  checked={form.activo}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer accent-indigo-600"
                />
                <label className="text-sm font-medium cursor-pointer">Activo</label>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalEditarResidente;