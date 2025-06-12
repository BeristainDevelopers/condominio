import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { FaFilePdf } from "react-icons/fa";

const documentosMock = [
    { id: 1, casa: 1, mes: "Enero", año: 2025, titulo: "Gasto Común Enero", url: "https://www.emol.com" },
    { id: 2, casa: 2, mes: "Febrero", año: 2025, titulo: "Gasto Común Febrero", url: "https://www.emol.com" },
    { id: 3, casa: 1, mes: "Marzo", año: 2024, titulo: "Gasto Común Marzo", url: "https://www.emol.com" },
    { id: 4, casa: 3, mes: "Enero", año: 2025, titulo: "Gasto Común Enero", url: "https://www.emol.com" },
];

const casasDisponibles = [...new Set(documentosMock.map(doc => doc.casa))];
const mesesDisponibles = [...new Set(documentosMock.map(doc => doc.mes))];
const añosDisponibles = [...new Set(documentosMock.map(doc => doc.año))];

export const DocumentosPanel = () => {
    const [casa, setCasa] = useState("");
    const [mes, setMes] = useState("");
    const [año, setAño] = useState("");
    const [resultados, setResultados] = useState([]);

    const handleBuscar = () => {
        const filtrados = documentosMock.filter((doc) => {
        return (
            (!casa || doc.casa === Number(casa)) &&
            (!mes || doc.mes === mes) &&
            (!año || doc.año === Number(año))
        );
        });
        setResultados(filtrados);
    };

    return (
        <motion.div
        className="p-6 bg-white rounded-lg shadow space-y-6 container mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-bold text-indigo-800 text-center">BÚSQUEDA DE DOCUMENTOS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Casa</label>
                    <select
                        value={casa}
                        onChange={(e) => setCasa(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Todas</option>
                        {casasDisponibles.map((c) => (
                        <option key={c} value={c}>{`Casa ${c}`}</option>
                        ))}
                    </select>
                </div>
                <div>
                <label className="block mb-1 font-semibold text-gray-600">Mes</label>
                    <select
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Todos</option>
                        {mesesDisponibles.map((m) => (
                        <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Año</label>
                    <select
                        value={año}
                        onChange={(e) => setAño(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Todos</option>
                        {añosDisponibles.map((a) => (
                        <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                onClick={handleBuscar}
                className="bg-indigo-600 text-white px-4 py-2 rounded transition-color duration-300 hover:bg-indigo-800 cursor-pointer"
                >
                Buscar
                </button>
            </div>

            <AnimatePresence>
                {resultados.length > 0 && (
                <motion.div
                    className="space-y-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <h3 className="font-semibold text-gray-700">Resultados:</h3>
                    {resultados.map((doc) => (
                    <motion.div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded hover:shadow hover:bg-gray-100 transition-color duration-300"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-3">
                            <FaFilePdf className="text-red-600 text-2xl" />
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-800">{doc.titulo}</span>
                                <span className="text-sm text-gray-500">
                                    Casa {doc.casa} - {doc.mes} {doc.año}
                                </span>
                            </div>
                        </div>

                        <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-800 transition-colors duration-300"
                        >
                        Ver PDF
                        </a>
                    </motion.div>
                    ))}
                </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};