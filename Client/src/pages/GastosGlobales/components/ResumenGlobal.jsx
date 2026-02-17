import React from "react";
import { TablaConComprobante } from "./TablaConComprobante";
import { LoadSpinner } from "../../../components/ui/loadSpinner";

const money = (v) => `$ ${Number(v || 0).toLocaleString("es-CL")}`;
const totalIngresosSimple = (data) =>
    Object.values(data || {}).reduce((a, b) => a + Number(b || 0), 0);

const totalMorosos = (arr) =>
    Array.isArray(arr) ? arr.reduce((a, b) => a + Number(b?.monto || 0), 0) : 0;

export const ResumenGlobal = ({
    gastoGlobal,
    saldoCuentaCorriente,
    volver,
    handleSubmit,
    loading
}) => {
    const totalIngresos = Object.values(gastoGlobal.listaIngresos || {}).reduce(
        (a, b) => a + Number(b || 0),
        0,
    );

    const totalEgresos = Object.values(gastoGlobal.listaEgresos || {}).reduce(
        (a, b) => a + Number(b?.monto || 0),
        0,
    );

    const resultado = totalIngresos - totalEgresos;

    return (
        <div className="p-8 bg-white rounded shadow border border-gray-200 space-y-10">
            <h1 className="text-2xl font-bold text-center text-indigo-800">
                Revisión Informe de Gastos Globales
            </h1>

            {/* RESUMEN */}
            <section>
                <h2 className="font-bold text-lg mb-2">Resumen del Mes</h2>

                <table className="w-full border text-sm">
                    <tbody>
                        <tr className="border">
                            <td className="p-2">Total Ingresos</td>
                            <td className="p-2 text-right">
                                {money(totalIngresos)}
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="p-2">Total Egresos</td>
                            <td className="p-2 text-right">
                                {money(totalEgresos)}
                            </td>
                        </tr>
                        <tr className="border font-bold bg-gray-100">
                            <td className="p-2">Resultado</td>
                            <td className="p-2 text-right">
                                {money(resultado)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* SALDOS */}
            <section>
                <h2 className="font-bold text-lg mb-2">
                    Saldo Cuenta Corriente
                </h2>

                <table className="w-full border text-sm">
                    <tbody>
                        <tr className="border">
                            <td className="p-2">Saldo anteanterior</td>
                            <td className="p-2 text-right">
                                {money(saldoCuentaCorriente.saldoAnteAnterior)}
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="p-2">Saldo anterior</td>
                            <td className="p-2 text-right">
                                {money(saldoCuentaCorriente.saldoAnterior)}
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="p-2">Saldo actual</td>
                            <td className="p-2 text-right">
                                {money(saldoCuentaCorriente.saldoActual)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* INGRESOS */}
            <section>
                <h2 className="font-bold text-lg mb-2">Detalle Ingresos</h2>

                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Concepto</th>
                            <th className="p-2 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(gastoGlobal.listaIngresos || {}).map(
                            ([k, v]) => (
                                <tr key={k} className="border">
                                    <td className="p-2">
                                        {k.replaceAll("_", " ")}
                                    </td>
                                    <td className="p-2 text-right">
                                        {money(v)}
                                    </td>
                                </tr>
                            ),
                        )}
                        <tr className="border font-bold bg-gray-100">
                            <td className="p-2">TOTAL</td>
                            <td className="p-2 text-right">
                                {money(
                                    totalIngresosSimple(
                                        gastoGlobal.listaIngresos,
                                    ),
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* EGRESOS DEL MES */}
            <TablaConComprobante
                titulo="Detalle Egresos del Mes"
                data={gastoGlobal.listaEgresos}
            />

            {/* INGRESOS FONDO RESERVA */}
            <TablaConComprobante
                titulo="Ingresos Fondo de Reserva"
                data={gastoGlobal.listaIngresosFondoReserva}
            />

            {/* EGRESOS FONDO RESERVA */}
            <TablaConComprobante
                titulo="Egresos Fondo de Reserva"
                data={gastoGlobal.listaEgresosFondoReserva}
            />

            {/* MOROSOS */}
            <section>
                <h2 className="font-bold text-lg mb-2">Residentes Morosos</h2>

                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Casa</th>
                            <th className="p-2">Residente</th>
                            <th className="p-2 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(gastoGlobal.resitentesMorosos || {}).map(
                            (m, i) => (
                                <tr key={i} className="border">
                                    <td className="p-2 text-center">
                                        {m.casa}
                                    </td>
                                    <td className="p-2 text-center">
                                        {m.residente}
                                    </td>
                                    <td className="p-2 text-right">
                                        {money(m.monto)}
                                    </td>
                                </tr>
                            ),
                        )}
                        <tr className="border font-bold bg-gray-100">
                            <td colSpan={2} className="p-2">
                                TOTAL DEUDA
                            </td>
                            <td className="p-2 text-right">
                                {money(
                                    totalMorosos(gastoGlobal.resitentesMorosos),
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* BOTONES */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={volver}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Volver
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800"
                >
                    {loading ? (
                        <>
                            <LoadSpinner
                                size="10px"
                                height="h-2"
                                color="text-white"
                            />
                            Generando
                        </>
                    ) : (
                        <>Generar Informe</>
                    )}
                </button>
            </div>
        </div>
    );
};
