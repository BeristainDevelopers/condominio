import { useState } from "react";
import { soloNumeros } from "../../../utils/validators";

export const DetalleEgresos = ({
    gastoGlobal,
    setGastoGlobal,
    volver,
    handleStep,
}) => {
    const [egresos, setEgresos] = useState([
        { nombre: "Remuneraciones", monto: "", comprobante: "" },
        { nombre: "Cotizaciones", monto: "", comprobante: "" },
        { nombre: "Electricidad", monto: "", comprobante: "" },
    ]);

    const [nuevoEgreso, setNuevoEgreso] = useState({
        nombre: "",
        monto: "",
        comprobante: "",
    });

    const handleChange = (index, field, value) => {
        if (field === "monto" && value !== "" && !soloNumeros(value)) return;

        setEgresos((prev) =>
            prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
        );
    };

    const agregarEgreso = () => {
        const { nombre, monto, comprobante } = nuevoEgreso;
        if (!nombre || !monto) return;

        setEgresos((prev) => [...prev, { nombre, monto, comprobante }]);

        setNuevoEgreso({ nombre: "", monto: "", comprobante: "" });
    };

    const handleAvanzar = () => {
        setGastoGlobal((prev) => ({
            ...prev,
            listaEgresos: egresos,
        }));
        handleStep();
    };

    const isDirty = egresos.slice(0, 3).every((e) => e.monto !== "");

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 4: Egresos del Mes
            </h2>

            {/* EGRESOS */}
            {egresos.map((egreso, index) => (
                <div key={index} className="grid grid-cols-3 gap-3">
                    <input
                        className="p-2 border rounded bg-gray-50"
                        value={egreso.nombre}
                        onChange={(e) =>
                            handleChange(index, "nombre", e.target.value)
                        }
                        placeholder="Nombre"
                        disabled={index < 3}
                    />

                    <input
                        className="p-2 border rounded"
                        value={egreso.monto}
                        onChange={(e) =>
                            handleChange(index, "monto", e.target.value)
                        }
                        placeholder="Monto"
                        inputMode="numeric"
                    />

                    <input
                        className="p-2 border rounded"
                        value={egreso.comprobante}
                        onChange={(e) =>
                            handleChange(index, "comprobante", e.target.value)
                        }
                        placeholder="Comprobante"
                    />
                </div>
            ))}

            {/* AGREGAR NUEVO */}
            <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold text-gray-600">
                    Agregar egreso extra
                </h3>

                <div className="grid grid-cols-3 gap-3">
                    <input
                        className="p-2 border rounded"
                        placeholder="Nombre"
                        value={nuevoEgreso.nombre}
                        onChange={(e) =>
                            setNuevoEgreso((p) => ({
                                ...p,
                                nombre: e.target.value,
                            }))
                        }
                    />

                    <input
                        className="p-2 border rounded"
                        placeholder="Monto"
                        value={nuevoEgreso.monto}
                        inputMode="numeric"
                        onChange={(e) => {
                            if (
                                e.target.value === "" ||
                                soloNumeros(e.target.value)
                            ) {
                                setNuevoEgreso((p) => ({
                                    ...p,
                                    monto: e.target.value,
                                }));
                            }
                        }}
                    />

                    <input
                        className="p-2 border rounded"
                        placeholder="Comprobante"
                        value={nuevoEgreso.comprobante}
                        onChange={(e) =>
                            setNuevoEgreso((p) => ({
                                ...p,
                                comprobante: e.target.value,
                            }))
                        }
                    />
                </div>

                <button
                    onClick={agregarEgreso}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Agregar egreso
                </button>
            </div>

            {/* BOTONES */}
            <div className="flex mt-6 justify-between">
                <button
                    onClick={volver}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Volver
                </button>

                <button
                    onClick={handleAvanzar}
                    disabled={!isDirty}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
