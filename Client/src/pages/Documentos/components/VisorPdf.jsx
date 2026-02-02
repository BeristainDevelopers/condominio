import { motion } from "framer-motion";

export const VisorPdf = ({ rutaPdf, setPdfSeleccionado }) => {
        console.log("Ruta", rutaPdf)
        console.log("seleccionado", setPdfSeleccionado);
    return (
        // Fondo oscuro tipo modal
        
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-6">
            
            {/* Contenedor del visor */}
            <motion.div
                className="bg-white w-full max-w-5xl h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* Header con botón cerrar */}
                <div className="w-full p-2 bg-gray-100 flex justify-end border-b">
                    <button
                        onClick={() => setPdfSeleccionado(false)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800 transition cursor-pointer"
                    >
                        X
                    </button>
                </div>

                {/* Visor PDF */}
                <object
                    data={`http://localhost:3000${rutaPdf}`}
                    type="application/pdf"
                    className="w-full h-full"
                />
            </motion.div>
        </div>
    );
};
