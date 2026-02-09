import { soloNumeros } from "../../../utils/validators";

export const SaldoCuentaCorriente = ({ setSaldoCuentaCorriente, saldoCuentaCorriente, handleStep, volver }) => {
    const getMonthData = (offset = 0) => {
        const baseDate = new Date();

        const year = baseDate.getFullYear();
        const month = baseDate.getMonth() + offset;

        const lastDay = new Date(year, month + 1, 0);

        const formatDate = {
            date: lastDay,
            day: lastDay.getDate(),
            month: String(lastDay.getMonth() + 1).padStart(2, "0"),
            year: lastDay.getFullYear(),
            formatted: `${String(lastDay.getDate()).padStart(2, "0")}/${String(
                lastDay.getMonth() + 1,
            ).padStart(2, "0")}/${lastDay.getFullYear()}`,
        };

        return formatDate.formatted;
    };

    const isDirty = saldoCuentaCorriente.saldoAnteAnterior && saldoCuentaCorriente.saldoAnterior && saldoCuentaCorriente.saldoActual

    return (
        <div className="p-6 bg-white rounded shadow space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">
                Paso 2: Saldo En Cuenta Corriente
            </h2>
            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    {`Saldo en Cuenta Corriente al ${getMonthData(-3)}`}
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={saldoCuentaCorriente.saldoAnteAnterior}
                    onChange={(e) => {
                        if (e.target.value === "" || soloNumeros(e.target.value)) {
                            setSaldoCuentaCorriente((prev) => ({
                                ...prev,
                                saldoAnteAnterior: e.target.value,
                            }));
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    {`Saldo en Cuenta Corriente al ${getMonthData(-2)}`}
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={saldoCuentaCorriente.saldoAnterior}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            soloNumeros(e.target.value)
                        ) {
                            setSaldoCuentaCorriente((prev) => ({
                                ...prev,
                                saldoAnterior: e.target.value,
                            }));
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-600">
                    {`Saldo en Cuenta Corriente al ${getMonthData(-1)}`}
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={saldoCuentaCorriente.saldoActual}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            soloNumeros(e.target.value)
                        ) {
                            setSaldoCuentaCorriente((prev) => ({
                                ...prev,
                                saldoActual: e.target.value,
                            }));
                        }
                    }}
                    placeholder="Ej: 25000"
                    inputMode="numeric"
                />
            </div>
            <div className={`flex mt-6 justify-between`}>
                <button
                    onClick={volver}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-gray-400"
                >
                    Volver
                </button>

                <button
                    onClick={handleStep}
                    className="bg-indigo-600 flex gap-2 justify-center items-center text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isDirty}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
