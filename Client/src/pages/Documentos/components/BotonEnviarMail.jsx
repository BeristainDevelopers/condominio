import { MdEmail } from "react-icons/md";
import { LoadSpinner } from "../../../components/ui/loadSpinner";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const BotonEnviarMail = ({ idGastoComun }) => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = async () => {
        try {
            setLoading(true)
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const requestOptions = {
                method: "POST",
                credentials: "include",
            };

            const response = await fetch(
                `${URL}/api/v1/gastos-comunes/reenviar-gastos-comunes/${idGastoComun}`,
                requestOptions
            );

            const data = await response.json();
            console.log(data);

            if (data.code === 200) {
                setLoading(false)
                enqueueSnackbar(data.message, { variant: "success" });
            } else {
                setLoading(false)
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };
    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 text-sm bg-blue-600 text-white font-semibold px-3 py-1 rounded cursor-pointer hover:bg-blue-800 transition-colors duration-300 text-[1rem] min-w-[120px]"
            >
                {loading ? (
                    <LoadSpinner size="10px" height="h-2" color="text-white" />
                ) : (
                    <>
                        Enviar Por <MdEmail />
                    </>
                )}
            </button>
        </>
    );
};
