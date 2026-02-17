import { useState, useEffect } from "react";
import { soloNumeros } from "../../../utils/validators";

export const IngresoFondoReserva = ({ setGastoGlobal, volver, handleStep, gastoGlobal }) => {

    const ingresos = gastoGlobal.listaIngresosFondoReserva || {};

    const [total, setTotal] = useState(0);

    const [nuevo, setNuevo] = useState({
        key: "",
        comprobante: "",
        monto: ""
    });

    const ingresosFijos = ["ingresos_mes", "estacionamientos"];


    const handleChange = (key, field, value) => {
        if (field === "monto" && value !== "" && !soloNumeros(value)) return;

        setGastoGlobal(prev => ({
            ...prev,
            listaIngresosFondoReserva: {
                ...prev.listaIngresosFondoReserva,
                [key]: {
                    ...prev.listaIngresosFondoReserva[key],
                    [field]: value
                }
            }
        }));
    };


    const agregar = () => {
        const { key, comprobante, monto } = nuevo;
        if (!key || !monto) return;

        const safeKey = key.trim().replace(/\s+/g, "_").toLowerCase();

        setGastoGlobal(prev => ({
            ...prev,
            listaIngresosFondoReserva: {
                ...prev.listaIngresosFondoReserva,
                [safeKey]: {
                    comprobante,
                    monto: Number(monto)
                }
            }
        }));

        setNuevo({ key: "", comprobante: "", monto: "" });
    };


    const eliminar = (key) => {
        setGastoGlobal(prev => {
            const copia = { ...prev.listaIngresosFondoReserva };
            delete copia[key];

            return {
                ...prev,
                listaIngresosFondoReserva: copia
            };
        });
    };


    useEffect(() => {
        const suma = Object.values(ingresos)
            .filter(v => v?.monto && !isNaN(v.monto))
            .reduce((acc, v) => acc + Number(v.monto), 0);

        setTotal(suma);
    }, [ingresos]);


    const isDirty = ingresos.ingresos_mes && ingresos.estacionamientos;

    const handleAvanzar = () => {
        setGastoGlobal(prev => ({
            ...prev,
            totalIngresosFondoReserva: total
        }));
        handleStep();
    };

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">

            <h2 className="text-xl font-bold text-gray-700">
                Ingresos Fondo de Reserva
            </h2>

            {/* FIJOS */}
            {[
                { key: "ingresos_mes", label: "Ingresos en el mes" },
                { key: "estacionamientos", label: "Estacionamientos" }
            ].map(({ key, label }) => (
                <div key={key}>
                    <label className="block mb-1 font-medium text-gray-600">
                        {label}
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="p-2 border rounded"
                            placeholder="Comprobante"
                            value={ingresos[key]?.comprobante || ""}
                            onChange={(e)=>handleChange(key,"comprobante",e.target.value)}
                        />

                        <input
                            className="p-2 border rounded"
                            placeholder="Monto"
                            inputMode="numeric"
                            value={ingresos[key]?.monto || ""}
                            onChange={(e)=>handleChange(key,"monto",e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* AGREGAR */}
            <div className="border-t pt-4 space-y-2">
                <h3 className="font-semibold text-gray-600">Agregar ingreso</h3>

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Concepto"
                    value={nuevo.key}
                    onChange={(e)=>setNuevo(p=>({...p,key:e.target.value}))}
                />

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Comprobante"
                    value={nuevo.comprobante}
                    onChange={(e)=>setNuevo(p=>({...p,comprobante:e.target.value}))}
                />

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Monto"
                    inputMode="numeric"
                    value={nuevo.monto}
                    onChange={(e)=>{
                        if(e.target.value===""||soloNumeros(e.target.value)){
                            setNuevo(p=>({...p,monto:e.target.value}))
                        }
                    }}
                />

                <button
                    onClick={agregar}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Agregar ingreso
                </button>
            </div>

            {/* RESUMEN */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">Resumen</h3>

                {Object.entries(ingresos).map(([key, value])=>{
                    const esFijo = ingresosFijos.includes(key);

                    return (
                        <div key={key} className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm">
                            <span>
                                {key.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}
                            </span>

                            <div className="flex gap-3 items-center">
                                <span>${Number(value?.monto||0).toLocaleString("es-CL")}</span>

                                {!esFijo && (
                                    <button
                                        onClick={()=>eliminar(key)}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* TOTAL */}
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total Ingresos Fondo Reserva
                </label>
                <input
                    className="w-full p-2 border rounded bg-gray-100"
                    value={total.toLocaleString("es-CL")}
                    disabled
                />
            </div>

            {/* BOTONES */}
            <div className="flex mt-6 justify-between">
                <button
                    onClick={volver}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
