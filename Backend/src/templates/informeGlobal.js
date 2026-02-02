const datos = {
    mes: "Febrero de 2025",

    resumenMes: {
        ingresos: 4601868,
        egresos: 3002252,
        resultado: 1599616,
    },

    saldosCuenta: [
        { fecha: "31.12.2024", monto: 15305280 },
        { fecha: "31.01.2025", monto: 12735002 },
        { fecha: "28.02.2025", monto: 9810254 },
    ],

    ingresosMes: [
        { concepto: "Ingresos gastos comunes del mes", monto: 2959014 },
        {
            concepto: "Ingresos por gastos comunes de meses anteriores",
            monto: 631156,
        },
        { concepto: "Ingresos por estacionamientos", monto: 266698 },
    ],

    egresosMes: {
        administracion: [
            {
                concepto: "Total Remuneraciones (Haberes)",
                comprobante: "Liquidación remuneraciones",
                monto: 1853021,
            },
            {
                concepto: "Cotizaciones de Previsión",
                comprobante: "Planillas cotizaciones",
                monto: 174145,
            },
        ],
        consumo: [
            {
                concepto: "Consumo electricidad (ENEL)",
                comprobante: "BE 338719937",
                monto: 69078,
            },
        ],
        otros: [
            { concepto: "Jardinero", comprobante: "V 39", monto: 120000 },
            {
                concepto: "José Fuentes Martínez",
                comprobante: "BH 6",
                monto: 372000,
            },
        ],
    },

    fondoReserva: {
        ingresos: [
            { concepto: "Ingresos en el mes", monto: 270090 },
            { concepto: "Estacionamientos", monto: 266698 },
        ],
        egresos: [
            {
                concepto: "Cambio Sistema Eléctrico Garita",
                comprobante: "V 41",
                monto: 567000,
            },
        ],
    },

    atrasos: [
        { casa: "N", residente: "Elena Guerra", monto: 338582 },
        { casa: "1058", residente: "Mónica Garcés", monto: 378143 },
    ],
};


export const generarTemplateInformeGlobalPDF = (datos) => {

  const fmt = v => `$ ${v.toLocaleString("es-CL")}`;

  const filasResumen = `
    <tr><td>Total Ingresos del Mes</td><td class="right">${fmt(datos.resumenMes.ingresos)}</td></tr>
    <tr><td>Total Egresos del Mes</td><td class="right">${fmt(datos.resumenMes.egresos)}</td></tr>
    <tr class="bold"><td>Resultado del Mes</td><td class="right">${fmt(datos.resumenMes.resultado)}</td></tr>
  `;

  const filasSaldos = datos.saldosCuenta.map(s =>
    `<tr><td>Saldo en Cuenta Corriente al ${s.fecha}</td><td class="right">${fmt(s.monto)}</td></tr>`
  ).join("");

  const filasIngresos = datos.ingresosMes.map(i =>
    `<tr><td>${i.concepto}</td><td class="right">${fmt(i.monto)}</td></tr>`
  ).join("");

  const filasEgresos = (titulo, items) => `
    <tr class="section"><td colspan="3">${titulo}</td></tr>
    ${items.map(e => `
      <tr>
        <td>${e.concepto}</td>
        <td>${e.comprobante || ""}</td>
        <td class="right">${fmt(e.monto)}</td>
      </tr>
    `).join("")}
  `;

  const filasAtrasos = datos.atrasos.map(a =>
    `<tr><td>${a.casa}</td><td>${a.residente}</td><td class="right">${fmt(a.monto)}</td></tr>`
  ).join("");

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
