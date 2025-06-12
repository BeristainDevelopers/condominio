import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const BotonVolver = ({ ruta }) => {
    const navigate = useNavigate();

    const handleVolver = () => {
        if (ruta) {
        navigate(ruta);
        } else {
        navigate(-1); // Volver a la página anterior
        }
    };

    return (
        <motion.button
        whileHover={{ scale: 1.05, delay: 0.20, transition: { duration: 0.20 } }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={handleVolver}
        className="mb-6 inline-flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer shadow-sm font-semibold transition-colors duration-200"
        >
        ← Volver
        </motion.button>
    );
};