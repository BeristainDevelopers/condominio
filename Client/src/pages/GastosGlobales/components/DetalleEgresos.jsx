import { useState, useEffect } from "react";
import { soloNumeros } from "../../../utils/validators";

export const DetalleEgresos = ({
    setGastoGlobal,
    volver,
    handleStep,
    gastoGlobal,
}) => {
    const egresos = gastoGlobal.listaEgresos || {};

    const [totalEgresos, setTotalEgresos] = useState("");
    const egresosFijos = ["remuneraciones", "cotizaciones", "electricidad"];

    const [nuevoEgreso, setNuevoEgreso] = useState({
        key: "",
        monto: "",
        comprobante: "",
    });

    const handleChangeEgreso = (key, field, value) => {
        if (field === "monto" && value !== "" && !soloNumeros(value)) return;

        setGastoGlobal((prev) => ({
            ...prev,
            listaEgresos: {
                ...prev.listaEgresos,
                [key]: {
                    ...prev.listaEgresos[key],
                    [field]: value,
                },
            },
        }));
    };

    const agregarEgreso = () => {
        const { key, monto, comprobante } = nuevoEgreso;
        if (!key || !monto) return;

        const safeKey = key.trim().replace(/\s+/g, "_").toLowerCase();

        setGastoGlobal((prev) => ({
            ...prev,
            listaEgresos: {
                ...prev.listaEgresos,
                [safeKey]: {
                    monto: Number(monto),
                    comprobante: comprobante || "",
                },
            },
        }));

        setNuevoEgreso({ key: "", monto: "", comprobante: "" });
    };

    const eliminarEgreso = (key) => {
        setGastoGlobal((prev) => {
            const copia = { ...prev.listaEgresos };
            delete copia[key];

            return {
                ...prev,
                listaEgresos: copia,
            };
        });
    };

    const isDirty =
        egresos.remuneraciones && egresos.cotizaciones && egresos.electricidad;

    useEffect(() => {
        const total = Object.values(egresos)
            .filter((e) => e?.monto && !isNaN(e.monto))
            .reduce((acc, e) => acc + Number(e.monto), 0);

        setTotalEgresos(total);
    }, [egresos]);

    const handleAvanzar = () => {
        setGastoGlobal((prev) => ({
            ...prev,
            totalEgresosMes: totalEgresos,
        }));
        handleStep();
    };

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 4: Egresos Del Mes
            </h2>

            {/* FIJOS */}
            {["remuneraciones", "cotizaciones", "electricidad"].map((key) => (
                <div key={key}>
                    <label className="block mb-1 font-medium text-gray-600 capitalize">
                        {key.replaceAll("_", " ")}
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            className="p-2 border border-gray-300 rounded"
                            value={egresos[key]?.monto || ""}
                            onChange={(e) =>
                                handleChangeEgreso(key, "monto", e.target.value)
                            }
                            placeholder="Monto"
                            inputMode="numeric"
                        />

                        <input
                            className="p-2 border border-gray-300 rounded"
                            value={egresos[key]?.comprobante || ""}
                            onChange={(e) =>
                                handleChangeEgreso(
                                    key,
                                    "comprobante",
                                    e.target.value,
                                )
                            }
                            placeholder="Boleta / Recibo"
                        />
                    </div>
                </div>
            ))}

            {/* NUEVO */}
            <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold text-gray-600">
                    Agregar egreso extra
                </h3>

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Concepto"
                    value={nuevoEgreso.key}
                    onChange={(e) =>
                        setNuevoEgreso((p) => ({ ...p, key: e.target.value }))
                    }
                />

                <div className="grid grid-cols-2 gap-3">
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
                        placeholder="Boleta / Recibo"
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

            {/* RESUMEN */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">
                    Resumen de egresos
                </h3>
                {Object.entries(egresos).map(([key, value]) => {
                    const esFijo = egresosFijos.includes(key);

                    return (
                        <div
                            key={key}
                            className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm"
                        >
                            <span>
                                {key
                                    .replaceAll("_", " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>

                            <div className="flex items-center gap-3">
                                <span>
                                    $
                                    {Number(value?.monto || 0).toLocaleString(
                                        "es-CL",
                                    )}
                                </span>

                                {!esFijo && (
                                    <button
                                        onClick={() => eliminarEgreso(key)}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                        title="Eliminar egreso"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total Egresos
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    value={totalEgresos}
                    disabled
                />
            </div>

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
