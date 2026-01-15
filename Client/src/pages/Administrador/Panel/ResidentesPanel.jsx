import { useState } from "react";
import { motion } from "framer-motion";
// Hooks
import { useDeleteResidente } from "../../../hooks/UseDeleteResidentes";
// Components
import { SinResultados } from "../../../components/ui/SinResultados";
import { Spinner } from "../../../components/ui/Spinner";
import BotonCrearResidente from "../components/BotonCrearResidente";
import ModalCrearResidente from "../components/ModalCrearResidente";
import BotonEditarResidente from "../components/BotonEditarResidente";
// Contexts
import { useResidentes } from "../../../context/ResidentesContext";
// Icons
import { MdPerson, MdEmail, MdHouse, MdVerifiedUser, MdDelete, MdPhone } from "react-icons/md";
import ModalEditarResidente from "../components/ModalEditarResidente";
import { formatPhone } from "../../../utils/formatPhone";

export const ResidentesPanel = () => {
  const [filtroCasa, setFiltroCasa] = useState("all");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [residenteEditar, setResidenteEditar] = useState(null);
  const { residentes, loading, fetchResidentes } = useResidentes();
  const { handleDelete } = useDeleteResidente(() => window.location.reload());
  console.log(residentes);

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
        {/* Filtro y Botón crear usuario */}
        <div className="flex justify-between items-center">
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
          <div>
            <button type="button" onClick={() => setOpenCreateModal(true)}>
              <BotonCrearResidente />
            </button>
            <ModalCrearResidente 
              isOpen={openCreateModal} 
              onClose={() => setOpenCreateModal(false)} 
              onSuccess={() => {
                setOpenCreateModal(false);
              }}
            />
            
          </div>
        </div>

          {/* Tabla usuarios*/}
          <div className="overflow-x-auto" style={{ maxHeight: '50vh', minHeight: '200px', overflowY: 'auto' }}>
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-sm text-center">
              <thead className="bg-indigo-600 text-white sticky top-0 z-10">
                <tr className="font-bold text-base">
                <th className="px-4 py-3"><MdPerson className="inline-block mr-1 mb-1" />Nombre</th>
                <th className="px-4 py-3"><MdHouse className="inline-block mr-1 mb-1" />Casa</th>
                <th className="px-4 py-3"><MdEmail className="inline-block mr-1 mb-1" />Email</th>
                <th className="px-4 py-3"><MdPhone className="inline-block mr-1 mb-1" />Teléfono</th>
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
                      {formatPhone(residente.telefono)}
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
                          <BotonEditarResidente onClick={() => {
                            setResidenteEditar(residente);
                            setOpenEditModal(true);
                          }} />
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
        <ModalEditarResidente 
          isOpen={openEditModal} 
          onClose={() => setOpenEditModal(false)} 
          onSuccess={() => {
            setOpenEditModal(false);
            fetchResidentes();
          }}
          residente={residenteEditar}
        />
        </section>
    ):(<SinResultados data={"residentes"} />)}
    </>
  );
};