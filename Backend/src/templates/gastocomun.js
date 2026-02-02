export const generarTemplateGastoComunPDF = (datos) => {
    const {
        fecha_informe,
        casa,
        mes_gasto,
        gastos,
        total,
        fecha_pago_limite,
        mensaje_importante,
    } = datos;

    const filasGastos = gastos
        .map(
            (gasto) => `
      <tr>
        <td>${gasto.nombre}</td>
        <td class="right">$${gasto.valor.toLocaleString("es-CL")}</td>
      </tr>
    `,
        )
        .join("");

    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
*{
  box-sizing:border-box;
  font-family:"Inter", Arial, sans-serif;
}

body{
  background:#f3f4f6;
  padding:30px;
  color:#111827;
}

/* HOJA */
.page{
  background:white;
  max-width:900px;
  margin:auto;
  padding:45px;
  border-radius:14px;
  box-shadow:0 8px 30px rgba(0,0,0,0.08);
}

/* ================= HEADER ================= */

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.comunidad{
  border:2px solid #111;
  padding:8px 14px;
  font-weight:700;
  font-size:13px;
  letter-spacing:.5px;
}

.logo{
  height:60px;
}

/* ================= TITULO ================= */

.titulo{
  text-align:center;
  margin-top:20px;
}

.titulo h2{
  font-size:20px;
  font-weight:700;
}

.titulo p{
  margin-top:5px;
  font-size:12px;
  color:#6b7280;
}

.hr{
  height:2px;
  background:#e5e7eb;
  margin:20px 0 25px;
}

/* ================= INFO ================= */

.info-top{
  display:flex;
  justify-content:space-between;
  font-size:13px;
  margin-bottom:20px;
}

/* ================= CARDS ================= */

.cards{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-bottom:20px;
}

.card{
  background:#f9fafb;
  padding:12px 14px;
  border-radius:8px;
}

.card small{
  color:#6b7280;
  font-size:11px;
  display:block;
}

.card strong{
  font-size:14px;
}

/* ================= TABLA ================= */

table{
  width:100%;
  border-collapse:collapse;
  margin-top:15px;
  font-size:13px;
}

thead{
  background:#111827;
  color:white;
}

th{
  text-align:left;
  padding:10px;
  font-weight:600;
}

td{
  padding:9px 10px;
  border-bottom:1px solid #e5e7eb;
}

tbody tr:nth-child(even){
  background:#f9fafb;
}

.right{
  text-align:right;
}

.total{
  background:#111827;
  color:white;
  font-weight:700;
  font-size:14px;
}

/* ================= PAYMENT ================= */

.payment-box{
  margin-top:25px;
  padding:14px;
  border:1px solid #d1d5db;
  border-radius:8px;
  font-size:12px;
  line-height:1.5;
  background:#fafafa;
}

/* ================= NOTAS ================= */

.notes{
  margin-top:25px;
  border:2px solid #111;
  border-radius:8px;
  padding:14px;
  min-height:120px;
  font-size:12px;
  font-weight:600;
}

/* ================= FOOTER ================= */

.footer{
  text-align:center;
  font-size:10px;
  margin-top:25px;
  color:#6b7280;
}
</style>
</head>

<body>

<div class="page">

  <!-- HEADER -->
  <div class="header">
      <div class="comunidad">
        COMUNIDAD HABITACIONAL<br/>
        SALVADOR 1050
      </div>

      <img src="https://dummyimage.com/140x60/000/fff&text=LOGO" class="logo"/>
  </div>

  <!-- TITULO -->
  <div class="titulo">
      <h2>INFORME DE GASTOS COMUNES</h2>
      <p>${fecha_informe}</p>
  </div>

  <div class="hr"></div>

  <!-- INFO CASA -->
  <div class="info-top">
      <div>
        Señores: <strong>Casa ${casa}</strong><br/>
        Presente
      </div>
  </div>

  <!-- CARDS -->
  <div class="cards">
      <div class="card">
          <small>PERÍODO</small>
          <strong>${mes_gasto}</strong>
      </div>

      <div class="card">
          <small>FECHA LÍMITE DE PAGO</small>
          <strong>${fecha_pago_limite}</strong>
      </div>

      <div class="card">
          <small>TOTAL A PAGAR</small>
          <strong>$${total.toLocaleString("es-CL")}</strong>
      </div>
  </div>

  <!-- TABLA -->
  <table>
      <thead>
        <tr>
          <th>Detalle del gasto</th>
          <th style="text-align:right">Valor</th>
        </tr>
      </thead>

      <tbody>
        ${filasGastos}
        <tr class="total">
          <td>TOTAL A PAGAR</td>
          <td class="right">$${total.toLocaleString("es-CL")}</td>
        </tr>
      </tbody>
  </table>

  <!-- PAGOS -->
  <div class="payment-box">
    <strong>Formas de pago</strong>
    <ol>
      <li>Transferencia bancaria a Comunidad Habitacional Salvador 1050 – RUT 56.018.440-9 – Cuenta Corriente Nº 5535786 – Banco Estado. Enviar comprobante a <strong>comunidadsalvador1050@gmail.com</strong>.</li>
      <li>Pago en efectivo o cheque directamente en Banco Estado o Tesorería del Comité.</li>
    </ol>
  </div>

  <!-- NOTAS -->
  <div class="notes">
    IMPORTANTE: ${mensaje_importante}
  </div>

  <div class="footer">
    Documento generado automáticamente • Sistema de Administración de Gastos Comunes
  </div>

</div>

</body>
</html>
`;
};
