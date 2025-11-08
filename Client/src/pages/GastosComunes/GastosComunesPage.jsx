import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Components
import { GastosFijos } from "./components/GastosFijos";
import { GastosExtras } from "./components/GastosExtras";
// import { ResumenFinal } from "./ResumenFinal"

export const GastosComunesPage = () => {
    const [pestañaActual, setPestañaActual] = useState(0);
    const [todasLasCasas, setTodasLasCasas] = useState([])
    const [gastoComun, setGastoComun] = useState("")
    const [fecha, setFecha] = useState("")
    const [fondoReserva, setFondoReserva] = useState("")

    const siguiente = () => setPestañaActual((prev) => prev + 1);
    const volver = () => setPestañaActual((prev) => prev - 1);

    useEffect(() => {
        const getAllCasas = async() =>{
            try {
                const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;
                const response = await fetch(`${URL}/api/v1/gastos-comunes/get-casas`)
                const data = await response.json()
                setTodasLasCasas(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllCasas()
    }, [])
    
    const renderTab = () => {
        switch (pestañaActual) {
            case 0:
                return <GastosFijos siguiente={siguiente} setGastoComun={setGastoComun} setFecha={setFecha} setFondoReserva={setFondoReserva} gastoComun={gastoComun} fondoReserva={fondoReserva} fecha={fecha} />;
            case 1:
                return todasLasCasas.length > 0 ? (
                <GastosExtras
                    volver={volver}
                    siguiente={siguiente}
                    todasLasCasas={todasLasCasas}
                    gastoComun={gastoComun}
                    fondoReserva={fondoReserva}
                    fecha={fecha}
                />
            ) : (
                <p className="text-center text-gray-600">Cargando casas...</p>
            );
            case 2:
            return <ResumenFinal volver={volver} />
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 pt-20">
            <motion.div
            className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-indigo-800">
                    PANEL DE GASTOS COMUNES
                </h1>
                {renderTab()}
            </motion.div>
        </div>
    );
};