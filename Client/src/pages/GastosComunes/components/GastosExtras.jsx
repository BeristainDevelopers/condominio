import { useState, useMemo } from "react";
import Select from "react-select";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { LoadSpinner } from "../../../components/ui/loadSpinner";
import { wait } from "../../../utils/formatTime";

// Icons
import { MdOutlineDelete } from "react-icons/md";

export const GastosExtras = ({
    volver,
    todasLasCasas,
    gastoComun,
    fondoReserva,
    fecha,
}) => {
    const [nombre, setNombre] = useState("");
    const [monto, setMonto] = useState("");
    const [casas, setCasas] = useState([]);
    const [aplicarATodos, setAplicarATodos] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const opcionesCasas = useMemo(() => {
        return todasLasCasas.map((casa) => ({
            label: `Casa ${casa.nombre}`,
            value: casa.id,
        }));
    }, [todasLasCasas]);

    const handleAgregar = () => {
        if (!nombre || !monto) {
            alert("Completa nombre y monto.");
            return;
        }

        const casasAplicables = aplicarATodos ? todasLasCasas : casas;

        if (casasAplicables.length === 0) {
            alert("Debes seleccionar al menos una casa.");
            return;
        }

        const nuevoGasto = {
            nombre,
            monto: Number(monto),
            casas: casasAplicables.map((c) => (aplicarATodos ? c.id : c.value)),
            fecha: new Date().toISOString(),
        };

        setGastos([...gastos, nuevoGasto]);
        setNombre("");
        setMonto("");
        setCasas([]);
        setAplicarATodos(false);
    };

    const handleClick = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("gasto_comun", gastoComun);
            formData.append("fecha", fecha);
            formData.append("fondo_reserva", fondoReserva);
            formData.append("gastos_extras", JSON.stringify(gastos));

            const requestOptions = {
                method: "POST",
                body: formData,
            };

            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/gastos-comunes/generar-gasto-comun`,
                requestOptions
            );
            const data = await response.json();

            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                await wait(2000)
                navigate("/");
                setLoading(false);
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow space-y-6">
            <h2 className="text-xl font-bold text-gray-700">Gastos Fijos</h2>
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Gasto Común
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded bg-gray-300"
                    value={gastoComun}
                    disabled
                />
            </div>
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Fondo Reserva
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded bg-gray-300"
                    value={fondoReserva}
                    disabled
                />
            </div>
            <h2 className="text-xl font-bold text-gray-700">
                Paso 2: Gastos Extras
            </h2>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Nombre del gasto
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Reparación luminarias"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    Monto
                </label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <label className="font-medium text-gray-600">
                    ¿A qué casas se aplica?
                </label>

                <div className="flex items-center space-x-2 mb-2">
                    <input
                        type="checkbox"
                        checked={aplicarATodos}
                        onChange={() => setAplicarATodos(!aplicarATodos)}
                    />
                    <span>Aplicar a todas las casas</span>
                </div>

                {!aplicarATodos && (
                    <Select
                        isMulti
                        options={opcionesCasas}
                        value={casas}
                        onChange={setCasas}
                        placeholder="Selecciona casas"
                        className="text-sm"
                        required
                    />
                )}
            </div>

            <button
                onClick={handleAgregar}
                className="bg-green-600 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-green-800"
            >
                Agregar gasto
            </button>

            <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                    Gastos agregados:
                </h3>

                {gastos.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Aún no hay gastos agregados.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {gastos.map((gasto, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-100 p-3 rounded shadow text-sm"
                            >
                                <div>
                                    <strong>{gasto.nombre}</strong> - $
                                    {gasto.monto.toLocaleString("es-CL")} →
                                    Casa(as):{" "}
                                    {gasto.casas
                                        .map((id) => {
                                            const casa = todasLasCasas.find(
                                                (c) => c.id === id
                                            );
                                            return casa ? casa.nombre : id;
                                        })
                                        .join(", ")}
                                </div>
                                <button
                                    className="text-red-600 transition-colors duration-300 cursor-pointer font-semibold hover:text-red-800 ml-4"
                                    onClick={() => {
                                        const nuevosGastos = gastos.filter(
                                            (_, i) => i !== index
                                        );
                                        setGastos(nuevosGastos);
                                    }}
                                >
                                    <MdOutlineDelete
                                        size={24}
                                        className="inline-block mb-1 mr-1"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={volver}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-gray-400"
                >
                    Volver
                </button>

                <button
                    onClick={handleClick}
                    className="bg-indigo-600 flex gap-2 justify-center items-center text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                        <LoadSpinner
                            size="10px"
                            height="h-2"
                            color="text-white"
                        /> 
                        Generando
                        </>
                    ) : (
                        <>
                            Finalizar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
