import { useState } from "react";
import { DetalleEgresos } from "./components/DetalleEgresos";
import { DetalleIngresos } from "./components/DetalleIngresos";
import { EgresosFondoReserva } from "./components/EgresosFondoReserva";
import { Morosos } from "./components/Morosos";
import { ResumenMes } from "./components/ResumenMes";
import { SaldoCuentaCorriente } from "./components/SaldoCuentaCorriente";
import { LoadSpinner } from "../../components/ui/loadSpinner";
import { motion } from "framer-motion";
import { IngresoFondoReserva } from "./components/IngresoFondoReserva";
import { ResumenGlobal } from "./components/ResumenGlobal";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";


export const GastosGlobales = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const siguiente = () => setStep((prev) => prev + 1);
    const volver = () => setStep((prev) => prev - 1);
    const [loading, setLoading] = useState(false);
    const [gastoGlobal, setGastoGlobal] = useState({
        totalIngresosMes: "",
        totalEgresosMes: "",
        superavitMes: "",
        listaIngresos: {},
        listaEgresos: [],
        listaIngresosFondoReserva: [],
        listaEgresosFondoReserva: [],
        resitentesMorosos: [],
    });
    const [saldoCuentaCorriente, setSaldoCuentaCorriente] = useState({
        saldoAnteAnterior: "",
        saldoAnterior: "",
        saldoActual: "",
    });

    const renderTab = () => {
        switch (step) {
            case 1:
                return (
                    <ResumenMes
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        handleStep={handleStep}
                    />
                );
            case 2:
                return (
                    <SaldoCuentaCorriente
                        setSaldoCuentaCorriente={setSaldoCuentaCorriente}
                        saldoCuentaCorriente={saldoCuentaCorriente}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 3:
                return (
                    <DetalleIngresos
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 4:
                return (
                    <DetalleEgresos
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 5:
                return (
                    <IngresoFondoReserva
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 6:
                return (
                    <EgresosFondoReserva
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );
            case 7:
                return (
                    <Morosos
                        setGastoGlobal={setGastoGlobal}
                        gastoGlobal={gastoGlobal}
                        volver={volver}
                        handleStep={handleStep}
                    />
                );

            case 8:
                return (
                    <ResumenGlobal
                        gastoGlobal={gastoGlobal}
                        saldoCuentaCorriente={saldoCuentaCorriente}
                        volver={volver}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                );
            default:
                return null;
        }
    };

    const handleStep = () => {
        if (step < 8) {
            siguiente();
        } else {
            setLoading(true);
            console.log("Proceso finalizado");
        }
    };



    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();


            formData.append("totalIngresosMes", gastoGlobal.totalIngresosMes);
            formData.append("totalEgresosMes", gastoGlobal.totalEgresosMes);
            formData.append("superavitMes", gastoGlobal.superavitMes);


            formData.append("listaIngresos", JSON.stringify(gastoGlobal.listaIngresos));
            formData.append("listaEgresos", JSON.stringify(gastoGlobal.listaEgresos));
            formData.append("listaIngresosFondoReserva", JSON.stringify(gastoGlobal.listaIngresosFondoReserva));
            formData.append("listaEgresosFondoReserva", JSON.stringify(gastoGlobal.listaEgresosFondoReserva));
            formData.append("resitentesMorosos", JSON.stringify(gastoGlobal.resitentesMorosos));

            formData.append("totalIngresosFondoReserva", gastoGlobal.totalIngresosFondoReserva);
            formData.append("totalEgresosFondoReserva", gastoGlobal.totalEgresosFondoReserva);
            formData.append("totalMorosos", gastoGlobal.totalMorosos);


            formData.append("saldoCuenta", JSON.stringify(saldoCuentaCorriente));


            const requestOptions = {
                method: "POST",
                body: formData,
            };

            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(
                `${URL}/api/v1/gastos-comunes/generar-informe-global`,
                requestOptions,
            );
            const data = await response.json();

            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                await wait(2000);
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
        <div className="bg-gradient-to-br from-indigo-50 to-white pt-20 pb-10">
            <motion.div
                className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-indigo-800">
                    PANEL DE GASTOS GLOBALES
                </h1>
                {renderTab()}
            </motion.div>
        </div>
    );
};
