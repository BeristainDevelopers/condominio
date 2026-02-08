import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 md:px-0">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg text-center"
      >
        ¡Bienvenido/a!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="text-lg md:text-2xl text-gray-700 mb-8 text-center max-w-xl"
      >
        Gestiona los <span className="font-semibold text-indigo-600">gastos comunes</span> de la comunidad habitacional <span className="font-bold text-indigo-800">Av. Salvador #1050</span> de manera fácil, rápida y segura.
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="rounded-2xl shadow-xl bg-white/80 px-8 py-6 flex flex-col items-center gap-2 border border-indigo-100"
      >
        <span className="text-3xl md:text-4xl text-indigo-500 animate-pulse">🏢</span>
        <span className="text-base md:text-lg text-gray-600">¡Tu comunidad, tu tranquilidad!</span>
      </motion.div>
    </div>
  );
};

export default Home;