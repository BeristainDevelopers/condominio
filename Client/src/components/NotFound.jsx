import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import { FaSadTear } from "react-icons/fa";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        >
            <motion.div
                className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <FaSadTear className="text-6xl text-indigo-500 mx-auto mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Uy! Página no encontrada</h1>
                <p className="text-gray-600 mb-6">
                La página que buscas no existe o fue movida.
                </p>
                <button
                onClick={() => navigate("/")}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                >
                Volver al inicio
                </button>
            </motion.div>
        </motion.div>
    );
};