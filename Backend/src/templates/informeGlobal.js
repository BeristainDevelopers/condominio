export const generarTemplateInformeGlobalPDF = (datos) => {
    const fmt = (v) => `$ ${v.toLocaleString("es-CL")}`;

    const filasResumen = `
    <tr><td>Total Ingresos del Mes</td><td class="right">${fmt(datos.resumenMes.ingresos)}</td></tr>
    <tr><td>Total Egresos del Mes</td><td class="right">${fmt(datos.resumenMes.egresos)}</td></tr>
    <tr class="bold"><td>Resultado del Mes</td><td class="right">${fmt(datos.resumenMes.resultado)}</td></tr>
  `;

    const filasSaldos = datos.saldosCuenta
        .map(
            (s) =>
                `<tr><td>Saldo en Cuenta Corriente al ${s.fecha}</td><td class="right">${fmt(s.monto)}</td></tr>`,
        )
        .join("");

    const filasIngresos = datos.ingresosMes
        .map(
            (i) =>
                `<tr><td>${i.concepto}</td><td class="right">${fmt(i.monto)}</td></tr>`,
        )
        .join("");

    const filasEgresos = (titulo, items) => `
    <tr class="section"><td colspan="3">${titulo}</td></tr>
    ${items
        .map(
            (e) => `
      <tr>
        <td>${e.concepto}</td>
        <td>${e.comprobante || ""}</td>
        <td class="right">${fmt(e.monto)}</td>
      </tr>
    `,
        )
        .join("")}
  `;

    const filasAtrasos = datos.atrasos
        .map(
            (a) =>
                `<tr><td>${a.casa}</td><td>${a.residente}</td><td class="right">${fmt(a.monto)}</td></tr>`,
        )
        .join("");

    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; margin: 40px; }
  h2 { margin-top: 30px; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  th, td { border: 1px solid #000; padding: 5px; }
  th { background: #f0f0f0; }
  .right { text-align: right; }
  .bold { font-weight: bold; }
  .section td { background: #e6e6e6; font-weight: bold; }
</style>
</head>
<body>

<h2>2.- RESUMEN DEL MES DE ${datos.mes}</h2>
<table>
  ${filasResumen}
</table>

<h2>3.- SALDO EN CUENTA CORRIENTE</h2>
<table>
  ${filasSaldos}
</table>

<h2>4.- DETALLE INGRESOS EN EL MES</h2>
<table>
  <tr><th>Concepto</th><th>Monto ($)</th></tr>
  ${filasIngresos}
</table>

<h2>5.- DETALLE EGRESOS EN EL MES</h2>
<table>
  <tr><th>Concepto</th><th>Comprobante</th><th>Monto ($)</th></tr>
  ${filasEgresos("GASTOS DE ADMINISTRACIÓN", datos.egresosMes.administracion)}
  ${filasEgresos("GASTOS DE CONSUMO", datos.egresosMes.consumo)}
  ${filasEgresos("OTROS GASTOS", datos.egresosMes.otros)}
</table>

<h2>6.- MOVIMIENTOS FONDOS DE RESERVA</h2>
<table>
  <tr><th>Concepto</th><th>Comprobante</th><th>Monto ($)</th></tr>
  ${filasEgresos("INGRESOS", datos.fondoReserva.ingresos)}
  ${filasEgresos("EGRESOS", datos.fondoReserva.egresos)}
</table>

<h2>7.- ATRASOS</h2>
<table>
  <tr><th>Casa</th><th>Residente</th><th>Monto Deuda ($)</th></tr>
  ${filasAtrasos}
</table>

</body>
</html>
`;
};
