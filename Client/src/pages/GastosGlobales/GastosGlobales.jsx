import React, { useState } from "react";
import { DetalleEgresos } from "./components/DetalleEgresos";
import { DetalleIngresos } from "./components/DetalleIngresos";
import { EgresosFondoReserva } from "./components/EgresosFondoReserva";
import { Morosos } from "./components/Morosos";
import { ResumenMes } from "./components/ResumenMes";
import { SaldoCuentaCorriente } from "./components/SaldoCuentaCorriente";
import { LoadSpinner } from "../../components/ui/loadSpinner";

export const GastosGlobales = () => {
    const [step, setStep] = useState(1);

    const siguiente = () => setStep((prev) => prev + 1);
    const volver = () => setStep((prev) => prev - 1);
    const [loading, setLoading] = useState(false);

        const renderTab = () => {
            switch (step) {
                case 1: 
                    return <ResumenMes />
                case 2:
                    return <SaldoCuentaCorriente />
                case 3:
                    return <DetalleIngresos />
                case 4:
                    return <DetalleEgresos />
                case 5:
                    return <EgresosFondoReserva />
                case 6:
                    return <Morosos />
                default:
                    return null;
            }
        };



    const handleClick = () => {
        if (step < 5) {
            siguiente();    
        } else {
            setLoading(true);
            console.log("Proceso finalizado");
        }
    };


    return (
        <>
            {renderTab()}
            <div className="flex justify-between mt-6">
                {step > 1 && (
                    <button
                    onClick={volver}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-gray-400"
                >
                    Volver
                </button>
                )}

                <button
                    onClick={handleClick}
                    className="bg-indigo-600 flex gap-2 justify-center items-center text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoadSpinner
                                size="10px"
                                height="h-2"
                                color="text-white"
                            />
                            Generando
                        </>
                    ) : (
                        step < 5 ? "Siguiente" : "Finalizar"
                    )}
                </button>
            </div>
        </>
    );
};
