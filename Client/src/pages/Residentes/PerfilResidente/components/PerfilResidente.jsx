import { motion } from "framer-motion";
import { useState } from "react";

// Components
import { BotonVolver } from "../../../../components/ui/BotonVolver";
import { SinResultados } from "../../../../components/ui/SinResultados";
import { Spinner } from "../../../../components/ui/Spinner";
import { ModalEditarResidente } from "../components/ModalEditarResidente";

// Icons
import { MdHouse, MdEmail, MdPerson, MdVerifiedUser, MdEdit } from "react-icons/md";

export const PerfilResidente = ({ residente, loading, setResidente, todasLasCasas }) => {
    const [modalAbierto, setModalAbierto] = useState(false);

    if (loading) return <Spinner />;

    return (
        <>
            {residente ? (
                <section>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-900 relative"
                    >
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="absolute top-4 right-4 text-gray-500 transition-color duration-200 cursor-pointer hover:text-sky-600"
                            title="Editar"
                        >
                            <MdEdit size={22} />
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
                                {residente.nombre[0]}
                                {residente.apellido[0]}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">
                                    {residente.nombre} {residente.apellido}
                                </h1>
                                <div className="flex items-center mt-1 space-x-2 text-sm text-gray-600">
                                    <MdPerson size={20} />
                                    <span>RUT: {residente.rut}</span>
                                </div>
                                <div className="flex items-center mt-1 space-x-2 text-sm text-gray-600">
                                    <MdHouse size={20} />
                                    <span>Casa {residente.casa}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4 text-sm text-gray-700">
                            <div className="flex items-center space-x-3">
                                <MdEmail size={22} />
                                <a
                                    href={`mailto:${residente.email}`}
                                    className="underline hover:text-indigo-600 transition"
                                >
                                    {residente.email}
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <MdVerifiedUser size={22} />
                                <span>
                                    Representante:{" "}
                                    <span
                                        className={`font-semibold ${
                                            residente.es_representante
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {residente.es_representante
                                            ? "Sí"
                                            : "No"}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <MdVerifiedUser size={22} />
                                <span>
                                    Activo:{" "}
                                    <span
                                        className={`font-semibold ${
                                            residente.activo
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {residente.activo ? "Sí" : "No"}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="text-center mt-3">
                        <BotonVolver />
                    </div>

                    <ModalEditarResidente
                        isOpen={modalAbierto}
                        onClose={() => setModalAbierto(false)}
                        residente={residente}
                        setResidente={setResidente}
                        todasLasCasas={todasLasCasas}
                    />
                </section>
            ) : (
                <SinResultados data={"perfiles"} />
            )}
        </>
    );
};