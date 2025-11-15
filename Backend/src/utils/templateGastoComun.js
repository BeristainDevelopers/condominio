export const crearTemplateGastosComunes = (nombreCompleto, mes, año, fecha) => {
  const template = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #4A90E2;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
          }
          .content h2 {
            color: #4A90E2;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .footer {
            background-color: #f1f1f1;
            color: #888888;
            font-size: 12px;
            text-align: center;
            padding: 15px;
          }
          .firma {
            margin-top: 30px;
            font-style: italic;
            font-size: 14px;
            color: #666666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Comunidad Habitacional Salvador 1050</h1>
          </div>
          <div class="content">
            <p><strong>Gastos Comunes - ${mes} ${año}</strong></p>
            <p>Estimado/a <strong>${nombreCompleto}</strong>,</p>
            <p>Se adjunta el detalle correspondiente a los gastos comunes del mes de <strong>${mes}</strong>, <strong> de ${año}</strong>.</p>
            <p>Para cualquier consulta, no dude en comunicarse con la administración.</p>
            <div class="firma">
              Atentamente,<br/>
              Administración Comunidad Salvador 1050
              Santiago, ${fecha}
            </div>
          </div>
          <div class="footer">
            © 2025 Comunidad Habitacional Salvador 1050 · Este es un mensaje informativo automático. No respondas a este correo.
          </div>
        </div>
      </body>
    </html>
  `;

  return template;
};
