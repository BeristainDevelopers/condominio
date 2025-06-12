import { motion } from "framer-motion";
import { FaRegSadTear } from "react-icons/fa";

export const SinResultados = ({data = "resultados"}) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center py-16 px-4"
        >
        <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No se encontraron {data}</h2>
        <p className="text-gray-500 max-w-md">
            No hay {data} registrados que coincidan con tu búsqueda. Intenta ajustar los filtros o verifica que los datos estén bien cargados.
        </p>
        </motion.div>
    );
};