import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { MdHouse, MdEmail, MdPerson } from "react-icons/md";

export const ModalEditarResidente = ({ isOpen, onClose, residente, onSave }) => {
    const [nombre, setNombre] = useState(residente.nombre);
    const [apellido, setApellido] = useState(residente.apellido);
    const [email, setEmail] = useState(residente.email);
    const [idCasa, setIdCasa] = useState(residente.id_casa);
    const [esRepresentante, setEsRepresentante] = useState(residente.es_representante);
    const [activo, setActivo] = useState(residente.activo);

    useEffect(() => {
        setNombre(residente.nombre);
        setApellido(residente.apellido);
        setEmail(residente.email);
        setIdCasa(residente.id_casa);
        setEsRepresentante(residente.es_representante);
        setActivo(residente.activo);
    }, [residente]);

    const handleGuardar = () => {
        const nuevoResidente = {
        ...residente,
        nombre,
        apellido,
        email,
        id_casa: idCasa,
        es_representante: esRepresentante,
        activo: activo,
        };
        onSave(nuevoResidente);
        onClose();
    };

    return (
        <AnimatePresence>
        {isOpen && (
            <motion.div
            className="fixed inset-0 flex items-center md:justify-center md:mr-0 z-50 bg-black/20 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <motion.div
                className="bg-white w-1/2 max-w-lg rounded-2xl shadow-2xl p-4 ml-3 mb-auto md:mb-0 md:ml-0 md:w-full md:p-8 text-gray-800"
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-indigo-700">Editar Residente</h2>

                    <div className="grid grid-cols-1 gap-5 text-xs md:text-base">
                        <div>
                            
                            <label className="block text-sm font-semibold mb-1"> <MdPerson className="inline-block mb-1 mr-1 text-indigo-600" />Nombre</label>
                            <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1"><MdPerson className="inline-block mb-1 mr-1 text-indigo-600" />Apellido</label>
                            <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1"><MdEmail className="inline-block mb-1 mr-1 text-indigo-600" />Correo electrónico</label>
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1"><MdHouse className="inline-block mb-1 mr-1 text-indigo-600" />Casa</label>
                            <input
                            type="number"
                            value={idCasa}
                            onChange={(e) => setIdCasa(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            min={1}
                            max={32}
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                            type="checkbox"
                            checked={esRepresentante}
                            onChange={(e) => setEsRepresentante(e.target.checked)}
                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                            />
                            <label className="text-sm font-medium cursor-pointer">Es representante</label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                            type="checkbox"
                            checked={activo}
                            onChange={(e) => setActivo(e.target.checked)}
                            className="h-4 w-4 cursor-pointer accent-green-600"
                            />
                            <label className="text-sm font-medium cursor-pointer">Está activo</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleGuardar}
                            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
};