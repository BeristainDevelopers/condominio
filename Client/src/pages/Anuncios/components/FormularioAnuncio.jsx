import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiOutlineDocumentText, HiPencilAlt } from "react-icons/hi";

export const FormularioAnuncio = ({ onEnviar }) => {
    const [asunto, setAsunto] = useState("");
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!asunto.trim() || !titulo.trim() || !mensaje.trim()) {
        setError("Por favor, completa todos los campos");
        return;
        }
        setError("");
        // Pasar los datos al handler externo (ejemplo: enviar email)
        onEnviar({ asunto, titulo, mensaje });
        // Reset form
        setAsunto("");
        setTitulo("");
        setMensaje("");
    };

    return (
        <section className="mt-4">
            <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">CREAR ANUNCIO</h2>

                {error && (
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 text-red-600 font-semibold text-center"
                    >
                    {error}
                    </motion.p>
                )}

                {/* Asunto */}
                <label className="block mb-4">
                    <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                    <HiMail className="w-5 h-5 text-indigo-600" /> Asunto
                    </span>
                    <input
                    type="text"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Ej: Información importante"
                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </label>

                {/* Título */}
                <label className="block mb-4">
                    <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                    <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" /> Título
                    </span>
                    <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Reunión del condominio"
                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </label>

                {/* Mensaje */}
                <label className="block mb-6">
                    <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                    <HiPencilAlt className="w-5 h-5 text-indigo-600" /> Mensaje
                    </span>
                    <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={5}
                    placeholder="Escribe aquí el contenido del anuncio"
                    className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-300"
                >
                    Enviar Anuncio
                </button>
            </motion.form>
        </section>
    );
};