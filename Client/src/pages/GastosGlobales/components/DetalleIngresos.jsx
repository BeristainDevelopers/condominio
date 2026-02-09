import { useState, useEffect } from "react";
import { soloNumeros } from "../../../utils/validators";

export const DetalleIngresos = ({
    setGastoGlobal,
    volver,
    handleStep,
}) => {
    const [ingresos, setIngresos] = useState({
        gastosComunes: "",
        estacionamientos: "",
        gastosMorosos: "",
    });

    const [totalIngresos, setTotalIngresos] = useState("");

    const [nuevoIngreso, setNuevoIngreso] = useState({
        key: "",
        value: "",
    });

    const handleChangeIngreso = (key, value) => {
        if (value === "" || soloNumeros(value)) {
            setIngresos((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const agregarIngreso = () => {
        const { key, value } = nuevoIngreso;
        if (!key || !value) return;

        const safeKey = key.trim().replace(/\s+/g, "_").toLowerCase();

        setIngresos((prev) => ({
            ...prev,
            [safeKey]: Number(value),
        }));

        setNuevoIngreso({ key: "", value: "" });
    };

    const handleAvanzar = () => {
        setIngresos((prev) => ({
            ...prev,
            totalIngresos: totalIngresos,
        }));

        setGastoGlobal((prev) => ({
            ...prev,
            listaIngresos: ingresos,
        }));
        handleStep();
    };

    const isDirty =
        ingresos.gastosComunes &&
        ingresos.estacionamientos &&
        ingresos.gastosMorosos;

    useEffect(() => {
        const total = Object.values(ingresos)
            .filter((v) => v !== "" && !isNaN(v))
            .reduce((acc, v) => acc + Number(v), 0);

        setTotalIngresos(total);
    }, [ingresos]);

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 3: Ingresos Del Mes
            </h2>
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Ingresos Gastos Comunes
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    value={ingresos.gastosComunes}
                    onChange={(e) => {
                        handleChangeIngreso("gastosComunes", e.target.value);
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Ingresos Gastos Comunes
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    value={ingresos.estacionamientos}
                    onChange={(e) =>
                        handleChangeIngreso("estacionamientos", e.target.value)
                    }
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Ingresos Gastos Comunes
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    value={ingresos.gastosMorosos}
                    onChange={(e) =>
                        handleChangeIngreso("gastosMorosos", e.target.value)
                    }
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold text-gray-600">
                    Agregar ingreso extra
                </h3>

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Concepto (ej: Multas)"
                    value={nuevoIngreso.key}
                    onChange={(e) =>
                        setNuevoIngreso((p) => ({ ...p, key: e.target.value }))
                    }
                />

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Monto"
                    value={nuevoIngreso.value}
                    inputMode="numeric"
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            soloNumeros(e.target.value)
                        ) {
                            setNuevoIngreso((p) => ({
                                ...p,
                                value: e.target.value,
                            }));
                        }
                    }}
                />

                <button
                    onClick={agregarIngreso}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Agregar ingreso
                </button>
            </div>

            {/* LISTADO */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">
                    Resumen de ingresos
                </h3>

                {Object.entries(ingresos).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex justify-between bg-gray-100 p-2 rounded text-sm"
                    >
                        <span>{key}</span>
                        <span>
                            ${Number(value || 0).toLocaleString("es-CL")}
                        </span>
                    </div>
                ))}
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total Ingresos
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    value={totalIngresos}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                    disabled
                />
            </div>

            <div className={`flex mt-6 justify-between`}>
                <button
                    onClick={volver}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-gray-400"
                >
                    Volver
                </button>

                <button
                    onClick={handleAvanzar}
                    className="bg-indigo-600 flex gap-2 justify-center items-center text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isDirty}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
