import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { useSnackbar } from "notistack";

// Contexts
import { useResidentes } from "../../../context/ResidentesContext";

// Components
import { SinResultados } from "../../../components/ui/SinResultados";
import { Spinner } from "../../../components/ui/Spinner";

// Icons
import {
    HiMail,
    HiOutlineDocumentText,
    HiPencilAlt,
    HiHome,
} from "react-icons/hi";

export const FormularioAnuncio = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [asunto, setAsunto] = useState("");
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [destino, setDestino] = useState("todos");
    const [casas, setCasas] = useState([]);
    const [error, setError] = useState("");
    const { residentes, loading } = useResidentes();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!asunto.trim() || !titulo.trim() || !mensaje.trim()) {
                setError("Por favor, completa todos los campos");
                return;
            }

            const formData = new FormData();
            formData.append("casas", JSON.stringify(destino));
            formData.append("mensaje", mensaje);
            formData.append("asunto", asunto);
            formData.append("titulo", titulo);
            const requestOptions = {
                method: "POST",
                credentials: "include",
                body: formData,
            };
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/residentes/enviar-anuncio`,
                requestOptions
            );
            const data = await response.json();

            if (data.code === 200) {
                enqueueSnackbar("Anuncio Enviado Correctamente", {
                    variant: "success",
                });
                setAsunto("");
                setTitulo("");
                setMensaje("");
                setDestino("");
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {}
    };

    const todasLasCasas = casas.map((casa) => ({
        value: casa.id,
        label: casa.nombre,
    }));

    useEffect(() => {
        const getAllCasas = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    credentials: "include",
                };
                const URL =
                    import.meta.env.VITE_APP_MODE === "desarrollo"
                        ? import.meta.env.VITE_URL_DESARROLLO
                        : import.meta.env.VITE_URL_PRODUCCION;

                const response = await fetch(
                    `${URL}/api/v1/gastos-comunes/get-casas`,
                    requestOptions
                );
                const data = await response.json();
                setCasas(
                    data.data.map((casa) => ({
                        value: casa.id,
                        label: casa.nombre,
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        };
        getAllCasas();
    }, []);

    if (loading) return <Spinner />;

    return (
        <>
            {residentes.length > 0 ? (
                <section className="pt-20">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
                    >
                        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">
                            CREAR ANUNCIO
                        </h2>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-4 text-red-600 font-semibold text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Selección de destino */}
                        <label className="block mb-4">
                            <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                <HiHome className="w-5 h-5 text-indigo-600" />{" "}
                                Destinatario
                            </span>
                            <div className="flex">
                                <Select
                                    isMulti
                                    options={casas}
                                    value={casas.filter((casa) =>
                                        destino.includes(casa.value)
                                    )}
                                    onChange={(selected) =>
                                        setDestino(selected.map((s) => s.value))
                                    }
                                    placeholder="Selecciona casas"
                                    className="text-sm w-[70%] me-4"
                                    closeMenuOnSelect={false}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDestino(casas.map((c) => c.value))
                                    }
                                    className="px-3 py-1 max-h-[40px] bg-indigo-600 hover:bg-indigo-800 text-white rounded text-sm w-[28%] cursor-pointer"
                                >
                                    Seleccionar todas
                                </button>
                            </div>
                        </label>

                        {/* Asunto */}
                        <label className="block mb-4">
                            <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                <HiMail className="w-5 h-5 text-indigo-600" />{" "}
                                Asunto
                            </span>
                            <input
                                type="text"
                                value={asunto}
                                onChange={(e) => setAsunto(e.target.value)}
                                placeholder="Ej: Información importante"
                                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </label>

                        {/* Título */}
                        <label className="block mb-4">
                            <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" />{" "}
                                Título
                            </span>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Ej: Reunión del condominio"
                                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </label>

                        {/* Mensaje */}
                        <label className="block mb-6">
                            <span className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                <HiPencilAlt className="w-5 h-5 text-indigo-600" />{" "}
                                Mensaje
                            </span>
                            <textarea
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                                rows={5}
                                placeholder="Escribe aquí el contenido del anuncio"
                                className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-300"
                        >
                            Enviar Anuncio
                        </button>
                    </motion.form>
                </section>
            ) : (
                <SinResultados data={"residentes"} />
            )}
        </>
    );
};
