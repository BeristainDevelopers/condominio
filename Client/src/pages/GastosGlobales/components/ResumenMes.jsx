import { soloNumeros } from "../../../utils/validators";

export const ResumenMes = ({ setGastoGlobal, gastoGlobal, handleStep }) => {

    const isDirty = gastoGlobal.totalIngresosMes && gastoGlobal.totalEgresosMes 
    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 1: Resumen Del Mes
            </h2>
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total Ingresos del Mes:
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={gastoGlobal.totalIngresosMes}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            soloNumeros(e.target.value)
                        ) {
                            setGastoGlobal((prev) => ({
                                ...prev,
                                totalIngresosMes: e.target.value,
                                superavitMes:
                                    e.target.value -
                                    gastoGlobal.totalEgresosMes,
                            }));
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total Egresos del Mes:
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={gastoGlobal.totalEgresosMes}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            soloNumeros(e.target.value)
                        ) {
                            setGastoGlobal((prev) => ({
                                ...prev,
                                totalEgresosMes: e.target.value,
                                superavitMes:
                                    gastoGlobal.totalIngresosMes -
                                    e.target.value,
                            }));
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Superávit del Mes:
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    value={gastoGlobal.superavitMes}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                    disabled
                />
            </div>
            <div className={`flex mt-6 justify-end`}>
                <button
                    onClick={handleStep}
                    className="bg-indigo-600 flex gap-2 justify-center items-center text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isDirty}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
