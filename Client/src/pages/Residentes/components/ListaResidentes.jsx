import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import { SinResultados } from "../../../components/ui/SinResultados";
import { Spinner } from "../../../components/ui/Spinner";

// Icons
import { MdPerson, MdEmail, MdHouse, MdVerifiedUser, MdVisibility } from "react-icons/md";

const residentes = [
    {
        nombre: "Felipe",
        apellido: "Lagos",
        rut: "10000000-K",
        email: "felipe.lagos@condominio.cl",
        id_casa: 1,
        es_representante: true,
        activo: true,
    },
    {
        nombre: "María",
        apellido: "Pérez",
        rut: "12000000-5",
        email: "maria.perez@condominio.cl",
        id_casa: 2,
        es_representante: false,
        activo: true,
    },
    {
        nombre: "Juan",
        apellido: "Torres",
        rut: "13000000-2",
        email: "juan.torres@condominio.cl",
        id_casa: 3,
        es_representante: true,
        activo: false,
    },
    // Duplica datos para simular más registros
    ...Array.from({ length: 29 }, (_, i) => ({
        nombre: `Residente ${i + 1}`,
        apellido: `Apellido ${i + 1}`,
        rut: `10${i + 1000}-K`,
        email: `residente${i + 1}@condominio.cl`,
        id_casa: i+ 1,
        es_representante: i % 2 === 0,
        activo: i % 3 !== 0,
    })),
];

export const ListaResidentes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filtroCasa, setFiltroCasa] = useState("all");
    const [loading, setLoading] = useState(true);

    const residentesFiltrados =
        filtroCasa === "all"
        ? residentes
        : residentes.filter((r) => r.id_casa.toString() === filtroCasa);

    const residentesPorPagina = 16;
    const totalPaginas = Math.ceil(residentesFiltrados.length / residentesPorPagina);
    const startIndex = (currentPage - 1) * residentesPorPagina;
    const residentesPagina = residentesFiltrados.slice(
        startIndex,
        startIndex + residentesPorPagina
    );

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setCurrentPage(nuevaPagina);
        }
    };

    /* if (loading) return <Spinner /> */

    return (
        <>
        {residentes ? (
            <section className="container mx-auto">
                <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-4 space-y-4"
                >
                    {/* Filtro */}
                    <div className="flex items-center gap-3">
                        <label className="font-semibold text-gray-700">Filtrar por casa:</label>
                        <select
                        className="border rounded px-2 py-1 text-sm"
                        value={filtroCasa}
                        onChange={(e) => {
                            setFiltroCasa(e.target.value);
                            setCurrentPage(1);
                        }}
                        >
                            <option value="all">Todas</option>
                            {[...new Set(residentes.map((r) => r.id_casa))].map((casa) => (
                                <option key={casa} value={casa}>
                                Casa #{casa}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-sm text-center">
                            <thead className="bg-indigo-600 text-white">
                                <tr className="font-bold text-base">
                                <th className="px-4 py-3"><MdPerson className="inline-block mr-1 mb-1" />Nombre</th>
                                <th className="px-4 py-3"><MdHouse className="inline-block mr-1 mb-1" />Casa</th>
                                <th className="px-4 py-3"><MdEmail className="inline-block mr-1 mb-1" />Email</th>
                                <th className="px-4 py-3"><MdVerifiedUser className="inline-block mr-1 mb-1" />Representante</th>
                                <th className="px-4 py-3"><MdVerifiedUser className="inline-block mr-1 mb-1" />Activo</th>
                                <th className="px-4 py-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 font-semibold">
                                {residentesPagina.map((residente, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-color duration-200">
                                    <td className="px-4 py-3">
                                        {residente.nombre} {residente.apellido}
                                        <div className="text-xs text-gray-500">{residente.rut}</div>
                                    </td>
                                    <td className="px-4 py-3">#{residente.id_casa}</td>
                                    <td className="px-4 py-3 text-blue-600 hover:underline">
                                        <a href={`mailto:${residente.email}`}>{residente.email}</a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={residente.es_representante ? "text-green-600" : "text-red-600"}>
                                            {residente.es_representante ? "Sí" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={residente.activo ? "text-green-600" : "text-red-600"}>
                                            {residente.activo ? "Sí" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link to="/residentes/perfil" className="text-indigo-600 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer">
                                            <MdVisibility />
                                            Ver perfil
                                        </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-center gap-2 items-center text-sm">
                        <button
                        onClick={() => cambiarPagina(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded bg-gray-300 font-semibold cursor-pointer transition-colors duration-300 hover:bg-gray-400 
                        disabled:opacity-40 disabled:hover:bg-gray-300 disabled:cursor-default"
                        >
                        Anterior
                        </button>
                        <span className="font-semibold">
                        {currentPage} de {totalPaginas}
                        </span>
                        <button
                        onClick={() => cambiarPagina(currentPage + 1)}
                        disabled={currentPage === totalPaginas}
                        className="px-2 py-1 rounded bg-gray-300 font-semibold cursor-pointer transition-colors duration-300 hover:bg-gray-400 
                        disabled:opacity-40 disabled:hover:bg-gray-300 disabled:cursor-default"
                        >
                        Siguiente
                        </button>
                    </div>
                </motion.div>
            </section>
        ):(<SinResultados data={"residentes"} />)}
        </>
    );
};