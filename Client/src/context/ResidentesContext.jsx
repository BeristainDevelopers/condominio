import { createContext, useContext, useEffect, useState } from "react";

const ResidentesContext = createContext();

export const ResidentesProvider = ({ children }) => {
    const [residentes, setResidentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResidentes = async () => {
        try {
            const URL =
                import.meta.env.VITE_APP_MODE === "desarrollo"
                    ? import.meta.env.VITE_URL_DESARROLLO
                    : import.meta.env.VITE_URL_PRODUCCION;

            const response = await fetch(`${URL}/api/v1/residentes/get-all-residentes`, { credentials: "include" });
            const data = await response.json();
            setResidentes(data.data);
        } catch (err) {
            console.error("Error al cargar residentes:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResidentes();
    }, []);

    return (
        <ResidentesContext.Provider value={{ residentes, loading, error, fetchResidentes }}>
            {children}
        </ResidentesContext.Provider>
    );
};

export const useResidentes = () => {
    const context = useContext(ResidentesContext);
    if (!context) {
        throw new Error("useResidentes debe usarse dentro de ResidentesProvider");
    }
    return context;
};