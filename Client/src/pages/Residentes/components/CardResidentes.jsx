import React, { useState, useEffect } from "react";

export const CardResidentes = () => {
    const [residentes, setResidentes] = useState([]);

    const getData = async () => {
        try {
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/residentes/get-casas-and-residentes`
            );

            const data = await response.json();
            setResidentes(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Residentes por casa</h2>

            {/* 4 columnas y cards más anchas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {residentes.map((casa) => (
                    <div
                        key={casa.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col gap-3 w-full h-72 overflow-y-auto"
                    >
                        {/* encabezado casita */}
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <span className="text-2xl">🏠</span>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Casa {casa.nombre}
                            </h3>
                        </div>

                        {/* residentes */}
                        <div className="flex flex-col gap-3">
                            {casa.casas_residente.map((residente) => (
                                <div
                                    key={residente.id}
                                    className={`rounded-xl p-3 border shadow-md text-sm ${
                                        residente.es_representante
                                            ? "bg-blue-50 border-blue-300"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-900 text-[1rem]">
                                            {residente.nombre} {residente.apellido}
                                        </p>

                                        {residente.es_representante && (
                                            <span className="px-2 py-0.5 text-[0.78rem] font-semibold bg-blue-600 text-white rounded-full">
                                                Representante
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-[0.9rem] text-gray-600 mt-1">📞 {residente.rut}</p>

                                    <p className="text-[0.9rem] text-gray-600">
                                        ✉️{" "}
                                        <a className="hover:text-indigo-900" href={`mailto:${residente.email}`}>
                                            {residente.email}
                                        </a>
                                    </p>


                                </div>
                            ))}

                            {casa.casas_residente.length === 0 && (
                                <p className="text-xs text-gray-400 italic text-center">
                                    Sin residentes registrados
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
