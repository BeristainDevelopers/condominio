import { useState, useEffect } from "react";
import { soloNumeros } from "../../../utils/validators";

export const Morosos = ({ setGastoGlobal, volver, handleStep, gastoGlobal }) => {

    const morosos = gastoGlobal.resitentesMorosos || {};

    const [total, setTotal] = useState(0);

    const [nuevo, setNuevo] = useState({
        casa: "",
        residente: "",
        monto: ""
    });


    const agregar = () => {
        const { casa, residente, monto } = nuevo;
        if (!casa || !residente || !monto) return;

        const key = `${casa}_${residente}`.toLowerCase().replace(/\s+/g,"_");

        setGastoGlobal(prev => ({
            ...prev,
            resitentesMorosos: {
                ...prev.resitentesMorosos,
                [key]: {
                    casa,
                    residente,
                    monto: Number(monto)
                }
            }
        }));

        setNuevo({ casa:"", residente:"", monto:"" });
    };


    const eliminar = (key) => {
        setGastoGlobal(prev => {
            const copia = { ...prev.resitentesMorosos };
            delete copia[key];

            return {
                ...prev,
                resitentesMorosos: copia
            };
        });
    };


    useEffect(() => {
        const suma = Object.values(morosos)
            .filter(v => v?.monto && !isNaN(v.monto))
            .reduce((acc, v) => acc + Number(v.monto), 0);

        setTotal(suma);
    }, [morosos]);


    const handleAvanzar = () => {
        setGastoGlobal(prev => ({
            ...prev,
            totalMorosos: total
        }));
        handleStep();
    };


    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">

            <h2 className="text-xl font-bold text-gray-700">
                Residentes Morosos
            </h2>

            {/* AGREGAR */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">Agregar moroso</h3>

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Casa"
                    value={nuevo.casa}
                    onChange={(e)=>setNuevo(p=>({...p,casa:e.target.value}))}
                />

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Residente"
                    value={nuevo.residente}
                    onChange={(e)=>setNuevo(p=>({...p,residente:e.target.value}))}
                />

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Monto deuda"
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
                    Agregar residente
                </button>
            </div>


            {/* RESUMEN */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">Resumen</h3>

                {Object.entries(morosos).length === 0 && (
                    <div className="text-gray-400 text-sm">
                        No hay residentes morosos registrados
                    </div>
                )}

                {Object.entries(morosos).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm">
                        <span>
                            Casa {value.casa}
                        </span>

                        <div className="flex gap-3 items-center">
                            <span>${Number(value?.monto||0).toLocaleString("es-CL")}</span>

                            <button
                                onClick={()=>eliminar(key)}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* TOTAL */}
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Total deuda morosos
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
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800"
                >
                    Finalizar
                </button>
            </div>
        </div>
    );
};
