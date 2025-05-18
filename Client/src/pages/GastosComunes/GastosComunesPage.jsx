import { useState, useEffect } from "react";
import { GastosFijos } from "./components/GastosFijos";
import { GastosExtras } from "./components/GastosExtras";
// import { ResumenFinal } from "./ResumenFinal"

export const GastosComunesPage = () => {
    const [pestañaActual, setPestañaActual] = useState(0);
    const [ todasLasCasas, setTodasLasCasas] = useState([])
    const [gastoComun, setGastoComun] = useState("")
    const [fondoReserva, setFondoReserva] = useState("")

    const siguiente = () => setPestañaActual((prev) => prev + 1);
    const volver = () => setPestañaActual((prev) => prev - 1);

    

    useEffect(() => {
        const getAllCasas = async() =>{
            try {
                const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;
                const response = await fetch(`${URL}/api/v1/gastos-comunes/get-casas`)
                const data = await response.json()
                setTodasLasCasas(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllCasas()
  
    }, [])
    

    const renderTab = () => {
        switch (pestañaActual) {
            case 0:
                return <GastosFijos siguiente={siguiente} setGastoComun={setGastoComun} setFondoReserva={setFondoReserva} gastoComun={gastoComun} fondoReserva={fondoReserva} />;
            case 1:
                return todasLasCasas.length > 0 ? (
                <GastosExtras
                    volver={volver}
                    siguiente={siguiente}
                    todasLasCasas={todasLasCasas}
                    gastoComun={gastoComun}
                    fondoReserva={fondoReserva}
                />
            ) : (
                <p className="text-center text-gray-600">Cargando casas...</p>
            );
            case 2:
            return <ResumenFinal volver={volver} />
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Panel de Gastos Comunes
                </h1>

                {renderTab()}

            </div>
        </div>
    );
};
