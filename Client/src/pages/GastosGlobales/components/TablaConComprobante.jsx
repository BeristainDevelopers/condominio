
const money = (v) => `$ ${Number(v || 0).toLocaleString("es-CL")}`;

const totalConComprobante = (data) =>
    Object.values(data || {}).reduce((a, b) => a + Number(b?.monto || 0), 0);

export const TablaConComprobante = ({ titulo, data }) => {

    const total = totalConComprobante(data);

    return (
        <section>
            <h2 className="font-bold text-lg mb-2">{titulo}</h2>

            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr className="">
                        <th className="p-2 text-left ">Concepto</th>
                        <th className="p-2 text-left">Comprobante</th>
                        <th className="p-2 text-right">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data || {}).length === 0 && (
                        <tr>
                            <td colSpan={3} className="p-2 text-center text-gray-400">
                                Sin registros
                            </td>
                        </tr>
                    )}

                    {Object.entries(data || {}).map(([nombre, e]) => (
                        <tr key={nombre} className="border">
                            <td className="p-2">{nombre.replaceAll("_", " ")}</td>
                            <td className="p-2">{e?.comprobante || "-"}</td>
                            <td className="p-2 text-right">{money(e?.monto)}</td>
                        </tr>
                    ))}

                    {/* TOTAL */}
                    <tr className="border font-bold bg-gray-100">
                        <td className="p-2" colSpan={2}>TOTAL</td>
                        <td className="p-2 text-right">{money(total)}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

