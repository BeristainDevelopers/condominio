import { useState } from "react";
import { soloNumeros } from "../../../utils/validators";

export const GastosFijos = ({
    siguiente,
    setFondoReserva,
    setGastoComun,
    fondoReserva,
    gastoComun,
    setFecha,
    fecha
}) => {

    const [error, setError] = useState({
        fecha: false,
        gastoComun: false,
        fondoReserva: false,
    });

    const handleSiguiente = () => {
        if (!gastoComun || !fondoReserva || !fecha) {
            setError({
                fecha: !fecha,
                gastoComun: !gastoComun, 
                fondoReserva: !fondoReserva,
            });
            return;
        }
        siguiente();
    };

    const isDirty = gastoComun && fondoReserva && fecha;

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 1: Fecha y Gastos Fijos
            </h2>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Fecha
                </label>
                <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}

                />
                {error.fecha && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                        La fecha es obligatoria.
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Gasto común fijo (por casa):
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={gastoComun}
                    onChange={(e) => {
                        if (e.target.value === '' || soloNumeros(e.target.value)) {
                            setGastoComun(e.target.value);
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
                {error.gastoComun && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                        El Monto De los Gastos Comunes es obligatorio.
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Fondo de reserva:
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={fondoReserva}
                    onChange={(e) => {
                        if (e.target.value === '' || soloNumeros(e.target.value)) {
                            setFondoReserva(e.target.value);
                        }
                    }}
                    placeholder="Ej: 5000"
                    inputMode="numeric"
                />
            {error.fondoReserva && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                        El Monto del Fondo de Reserva es obligatorio.
                    </p>
            )}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSiguiente}
                    disabled={!isDirty}
                    className="bg-indigo-600 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
