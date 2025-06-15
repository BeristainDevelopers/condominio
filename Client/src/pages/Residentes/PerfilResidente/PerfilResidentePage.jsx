import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import { PerfilResidente } from "./components/PerfilResidente";



export const PerfilResidentePage = () => {

    const [residente, setResidente] = useState({
        nombre: "",
        apellido: "",
        rut: "",
        email: "",
        casa: "",
        id_casa:"",
        es_representante:""

    });
    const [todasLasCasas, setTodasLasCasas] = useState([])
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
            const getResidente = async() =>{
                try {
                    const URL =
                    import.meta.env.VITE_APP_MODE === "desarrollo"
                        ? import.meta.env.VITE_URL_DESARROLLO
                        : import.meta.env.VITE_URL_PRODUCCION;
    
                const response = await fetch(`${URL}/api/v1/residentes/get-residente-id/${id}`, {credentials:"include"})
                const data = await response.json()
                const residenteData = data.data
                setResidente({
                    nombre: residenteData.nombre,
                    apellido: residenteData.apellido,
                    rut: residenteData.rut,
                    email: residenteData.email,
                    casa: residenteData.casa,
                    id_casa:residenteData.id_casa,
                    es_representante:residenteData.es_representante
                })
                setLoading(false)
                } catch (error) {
                    console.log(error);  
                }
            }
            getResidente()
        
        }, [])

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
    return (
        <>
            <PerfilResidente residente={residente} loading={loading} setResidente={setResidente} todasLasCasas={todasLasCasas} />
        </>
    )
};