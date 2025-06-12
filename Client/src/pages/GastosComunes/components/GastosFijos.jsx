import { useState } from "react"

export const GastosFijos = ({ siguiente, setFondoReserva, setGastoComun, fondoReserva, gastoComun }) => {
  
  const handleSiguiente = () => {
    if (!gastoComun || !fondoReserva) {
      alert("Por favor, completa ambos campos.")
      return
    }
    siguiente()
  }

  return (
    <div className="p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-700">Paso 1: Gastos Fijos</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Gasto común fijo (por casa):
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={gastoComun}
          onChange={(e) => setGastoComun(e.target.value)}
          placeholder="Ej: 25000"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Fondo de reserva:
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={fondoReserva}
          onChange={(e) => setFondoReserva(e.target.value)}
          placeholder="Ej: 5000"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSiguiente}
          className="bg-indigo-600 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
};