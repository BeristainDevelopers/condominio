import { useState } from "react";
import { motion } from "framer-motion";
// Hooks
import { useDeleteResidente } from "../../../hooks/UseDeleteResidentes";
// Components
import { SinResultados } from "../../../components/ui/SinResultados";
import { Spinner } from "../../../components/ui/Spinner";
// Contexts
import { useResidentes } from "../../../context/ResidentesContext";
// Icons
import { MdPerson, MdEmail, MdHouse, MdVerifiedUser, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export const ResidentesPanel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroCasa, setFiltroCasa] = useState("all");
  const { residentes, loading } = useResidentes();
  const { handleDelete } = useDeleteResidente(() => window.location.reload());

  const residentesFiltrados =
      filtroCasa === "all"
      ? residentes
      : residentes.filter((r) => r.casa.toString() === filtroCasa);

  const residentesPagina = residentesFiltrados;

  if (loading) return <Spinner />

  return (
    <>
    {residentes.length > 0 ? (
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
            {[...new Set(residentes.map((r) => r.casa))].map((casa) => (
                <option key={casa} value={casa}>
                Casa {casa}
                </option>
            ))}
            </select>
          </div>

          {/* Tabla con scroll y altura limitada */}
          <div className="overflow-x-auto" style={{ maxHeight: '50vh', minHeight: '200px', overflowY: 'auto' }}>
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-sm text-center">
              <thead className="bg-indigo-600 text-white sticky top-0 z-10">
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
                  <tr key={residente.id} className="hover:bg-gray-100 transition-color duration-200">
                    <td className="px-4 py-3">
                      {residente.nombre} {residente.apellido}
                      <div className="text-xs text-gray-500">{residente.rut}</div>
                    </td>
                    <td className="px-4 py-3">{residente.casa}</td>
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
                      <td className="flex px-4 py-3 justify-center">
                        <div className="flex justify-center items-center gap-2">
                          <button 
                            className="text-slate-100 bg-blue-600 px-2 py-1 rounded-lg  flex items-center justify-center gap-1 mx-auto cursor-pointer transition duration-200 hover:bg-blue-800"
                          >
                            <Link to={`/residentes/perfil/${residente.id}`}>
                                <MdEdit className="inline-block mb-1 mr-1" />
                                Editar
                            </Link>
                          </button>
                          <button 
                            className="text-slate-100 bg-red-600 px-2 py-1 rounded-lg  flex items-center justify-center gap-1 mx-auto cursor-pointer transition duration-200 hover:bg-red-800"
                            onClick={() => handleDelete(residente.id)}
                          >
                            <MdDelete />
                            Eliminar
                          </button>
                        </div>
                      </td>
                  </tr>
                  ))}
                </tbody>
            </table>
          </div>
            </motion.div>
        </section>
    ):(<SinResultados data={"residentes"} />)}
    </>
  );
};