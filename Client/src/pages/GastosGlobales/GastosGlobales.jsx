import { useState } from "react";
import { DetalleEgresos } from "./components/DetalleEgresos";
import { DetalleIngresos } from "./components/DetalleIngresos";
import { EgresosFondoReserva } from "./components/EgresosFondoReserva";
import { Morosos } from "./components/Morosos";
import { ResumenMes } from "./components/ResumenMes";
import { SaldoCuentaCorriente } from "./components/SaldoCuentaCorriente";
import { LoadSpinner } from "../../components/ui/loadSpinner";
import { motion } from "framer-motion";

export const GastosGlobales = () => {
    const [step, setStep] = useState(1);

    const siguiente = () => setStep((prev) => prev + 1);
    const volver = () => setStep((prev) => prev - 1);
    const [loading, setLoading] = useState(false);
    const [gastoGlobal, setGastoGlobal] = useState({
        totalIngresosMes: "",
        totalEgresosMes: "",
        superavitMes: "",
        listaIngresos: {},
        listaEgresos: [],
        listaIngresosFondoReserva: [],
        listaEgresosFondoReserva: [],
        resitentesMorosos: [],
    });
    const [saldoCuentaCorriente, setSaldoCuentaCorriente] = useState({
        saldoAnteAnterior: "",
        saldoAnterior: "",
        saldoActual: "",
    });

    const renderTab = () => {
        switch (step) {
            case 1:
                return (
                    <ResumenMes
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        handleStep={handleStep}
                    />
                );
            case 2:
                return (
                    <SaldoCuentaCorriente
                        setSaldoCuentaCorriente={setSaldoCuentaCorriente}
                        saldoCuentaCorriente={saldoCuentaCorriente}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 3:
                return (
                    <DetalleIngresos
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 4:
                return (
                    <DetalleEgresos
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 5:
                return (
                    <EgresosFondoReserva
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 6:
                return <Morosos />;
            default:
                return null;
        }
    };

    const handleStep = () => {
        if (step < 5) {
            siguiente();
        } else {
            setLoading(true);
            console.log("Proceso finalizado");
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white pt-20 pb-10">
            <motion.div
                className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-indigo-800">
                    PANEL DE GASTOS GLOBALES
                </h1>
                {renderTab()}
            </motion.div>
        </div>
    );
};
