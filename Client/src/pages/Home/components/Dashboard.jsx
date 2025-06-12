import { motion } from "framer-motion";

export const Dashboard = () => {
    return (
        <div className="p-6 space-y-4 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold text-indigo-800 mb-2">RESUMEN GASTOS COMUNES</h1>

            {/* Fila 1 - 5 bloques pequeños */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl p-4 shadow-md text-center"
                >
                    <span className="text-lg font-semibold text-indigo-800">Residentes</span>
                    <p className="text-sm text-indigo-600">58 activos</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 shadow-md text-center"
                >
                    <span className="text-lg font-semibold text-green-800">Pagos</span>
                    <p className="text-sm text-green-600">85% al día</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 shadow-md text-center"
                >
                    <span className="text-lg font-semibold text-yellow-800">Alertas</span>
                    <p className="text-sm text-yellow-600">2 nuevas</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 shadow-md text-center"
                >
                    <span className="text-lg font-semibold text-purple-800">Mensajes</span>
                    <p className="text-sm text-purple-600">5 sin leer</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 shadow-md text-center"
                >
                    <span className="text-lg font-semibold text-red-800">Visitas</span>
                    <p className="text-sm text-red-600">12 hoy</p>
                </motion.div>
            </div>

            {/* Fila 2 - 3 bloques grandes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Pagos Mensuales</h3>
                    <p className="text-gray-600 text-sm">Detalle de pagos realizados por mes.</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Resumen de Morosidad</h3>
                    <p className="text-gray-600 text-sm">Casas con deuda pendiente al día de hoy.</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Asistencia de Reuniones</h3>
                    <p className="text-gray-600 text-sm">Participación por residente o casa.</p>
                </motion.div>
            </div>

            {/* Fila 3 - 3 bloques grandes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Mantenimientos Programados</h3>
                    <p className="text-gray-600 text-sm">Revisión de ascensores, jardines, etc.</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Mensajes Recientes</h3>
                    <p className="text-gray-600 text-sm">Últimas comunicaciones del administrador.</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 h-64 shadow-xl border border-gray-100"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Ingreso de Visitas</h3>
                    <p className="text-gray-600 text-sm">Entradas registradas hoy en portería.</p>
                </motion.div>
            </div>
        </div>
    );
};