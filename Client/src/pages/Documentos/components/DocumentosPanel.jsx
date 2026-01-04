import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { FaFilePdf } from "react-icons/fa";
import { useEffect } from "react";
import { BotonEnviarMail } from "./BotonEnviarMail";

const mesesNombres = {
    "1": "Enero",
    "2": "Febrero",
    "3": "Marzo",
    "4": "Abril",
    "5": "Mayo",
    "6": "Junio",
    "7": "Julio",
    "8": "Agosto",
    "9": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
};


export const DocumentosPanel = ({setPdfSeleccionado, setRutaPdf}) => {
    const [casa, setCasa] = useState("");
    const [mes, setMes] = useState("");
    const [año, setAño] = useState("");
    const [documentos, setDocumentos] = useState({
        gastosComunes: [],
        meses: [],
        years: []
    });
    const [casasDisponibles, setCasasDisponibles ] = useState([])
    const [resultados, setResultados] = useState([]);


    const handleBuscar = () => {
        const filtrados = documentos.gastosComunes.filter((doc) => {
            return (
                (!casa || doc.casa == casa) &&
                (!mes || doc.mes == mes) &&
                (!año || doc.year == año)
            );
        });
        setResultados(filtrados);
    };

    const handlePdf = (rutaPdf) =>{
        try {
            setPdfSeleccionado(true)
            setRutaPdf(rutaPdf)
        } catch (error) {
            console.log(error);
        }
    }

    const getDocumentos = async () => {
        try {
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/gastos-comunes/get-gastos-comunes`
            );

            const data = await response.json();
            setDocumentos(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCasas = async () => {
        try {
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/gastos-comunes/get-casas`
            );

            const data = await response.json();
            setCasasDisponibles(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDocumentos();
        getCasas()
    }, []);

    return (
        <div className="pt-20 pb-10 z-0">
            <motion.div
                className="p-6 bg-white rounded-lg shadow space-y-6 container mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-bold text-indigo-800 text-center">
                    BÚSQUEDA DE DOCUMENTOS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-600">
                            Casa
                        </label>
                        <select
                            value={casa}
                            onChange={(e) => setCasa(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Todas</option>
                            {casasDisponibles.map((c) => (
                                <option key={c.id} value={c.id}>{`Casa ${c.nombre}`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-600">
                            Mes
                        </label>
                        <select
                            value={mes}
                            onChange={(e) => setMes(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            {documentos.meses.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-600">
                            Año
                        </label>
                        <select
                            value={año}
                            onChange={(e) => setAño(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            {documentos.years.map((a) => (
                                <option key={a.year} value={a.year}>
                                    {a.year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleBuscar}
                        className="bg-indigo-600 text-white px-4 py-2 rounded transition-color duration-300 hover:bg-indigo-800 cursor-pointer"
                    >
                        Buscar
                    </button>
                </div>

                <AnimatePresence>
                    {resultados.length > 0 && (
                        <motion.div
                            className="space-y-4 pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 className="font-semibold text-gray-700">
                                Resultados:
                            </h3>
                            {resultados.map((doc) => (
                                <motion.div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 border rounded hover:shadow hover:bg-gray-100 transition-color duration-300"
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <FaFilePdf className="text-red-600 text-2xl" />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">
                                                Gastos Comunes
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Casa {doc.gasto_casa?.nombre} - {mesesNombres[doc.mes]}{" "}
                                                {doc.year}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-x-1 flex">
                                        <BotonEnviarMail idGastoComun={doc.id}/>
                                        <button
                                        onClick={() =>{ 
                                            handlePdf(`/${doc.ruta_pdf.replace(/\\/g, "/")}`)
                                        }}
                                        className="flex items-center justify-center gap-2 text-sm bg-red-600 text-white font-semibold px-3 py-1 rounded cursor-pointer hover:bg-red-800 transition-colors duration-300 text-[1rem]"
                                    >
                                        <FaFilePdf /> Ver PDF 
                                    </button>
                                    
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};
