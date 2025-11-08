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

    // Generar filas dinámicas de gastos
    const filasGastos = gastos
        .map(
            (gasto) => `
      <tr>
        <td>${gasto.nombre}</td>
        <td>$${gasto.valor.toLocaleString("es-CL")}</td>
      </tr>
    `
        )
        .join("");

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; }
        .info { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid black; padding: 5px; text-align: left; }
        .total { font-weight: bold; }
        .payment-info { font-size: 10px; margin-top: 10px; }
        .important { margin-top: 20px; border: 1px solid black; padding: 10px; font-weight: bold; }
      </style>
    </head>
    <body>
  
      <div class="header">
        <h2>COMUNIDAD HABITACIONAL SALVADOR 1050</h2>
        <h3>INFORME DE GASTOS COMUNES</h3>
        <p>${fecha_informe}</p>
      </div>
  
      <div class="info">
        <p>Señores: Casa <strong>${casa}</strong></p>
        <p>Presente</p>
      </div>
  
      <div class="info">
        <p><strong>1.- GASTOS COMUNES DEL MES:</strong> ${mes_gasto}</p>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Detalle</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          ${filasGastos}
          <tr class="total">
            <td>TOTAL A PAGAR ($)</td>
            <td>$${total.toLocaleString("es-CL")}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="info">
        <p><strong>PLAZO PARA PAGAR HASTA EL:</strong> ${fecha_pago_limite}</p>
      </div>
  
      <div class="payment-info">
        <ol>
          <li>Vía transferencia bancaria, a nombre de la Comunidad Habitacional Salvador 1050, RUT: 56.018.440-9, Cuenta Corriente Nº 5535786, Banco del Estado de Chile, enviando el comprobante de pago al correo: <strong>comunidadsalvador1050@gmail.com</strong>.</li>
          <li>Pago en efectivo o cheque directamente en el Banco del Estado o entregando el respaldo a la Tesorería del Comité de Administración.</li>
        </ol>
      </div>
  
      <div class="important">
        IMPORTANTE: ${mensaje_importante}
      </div>
  
    </body>
    </html>
    `;
};
