import { generarTemplateGastoComunPDF } from "../templates/gastocomun.js";
import { generarPDF } from "../services/generarPDF.js";
import { getCurrentDirectory } from "../utils/path.js";
import * as path from "path";
import { fileURLToPath } from "url";
import { Casas } from "../models/Casas.model.js";
import { GastoComun } from "../models/GastosComunes.model.js";
import { enviarMailGastoComun } from "../services/email.services.js";
import { Residente } from "../models/Residentes.model.js";
import fs from "fs";


const __dirname = getCurrentDirectory(fileURLToPath(import.meta.url));

export const generarGastosComunes = async (req, res, next) => {
    try {

        console.log(req.body)
        const { fondo_reserva, gasto_comun, gastos_extras, fecha } = req.body;
        console.log("CONTROLER")
        const fechaArray = fecha.split("-")
        const year = fechaArray[0]
        const mes = fechaArray[1]
        const dia = fechaArray[2]

        let extrasParseados = [];

        extrasParseados = JSON.parse(gastos_extras);

        const casas = await Casas.findAll({
            where:{
                id: 11
            },
            raw:true
        });

        console.log(casas)

        const resumenFinal = casas.map((casa) => {
            const gastosParaCasa = extrasParseados
                .filter((gasto) => gasto.casas.includes(casa.id))
                .map((gasto) => ({
                    nombre: gasto.nombre,
                    monto: gasto.monto,
                    fecha: gasto.fecha,
                }));
            return {
                casa_id: casa.id,
                casa: casa.nombre,
                gasto_comun: Number(gasto_comun),
                fondo_reserva: Number(fondo_reserva),
                gastos_extras: gastosParaCasa,
            };
        });

        for (const casa of resumenFinal) {

            const datos = {
                fecha_informe: "22/10/2025",
                casa: casa.casa,
                mes_gasto: "Enero",
                gastos: [
                    {
                        nombre: "Fondo Reserva",
                        valor: casa.fondo_reserva,
                    },
                    {
                        nombre: "Gasto Comun",
                        valor: casa.gasto_comun,
                    },
                    ...casa.gastos_extras.map((extras) => ({
                        nombre: extras.nombre,
                        valor: extras.monto,
                    })),
                ],
                total:
                    Number(casa.gasto_comun) +
                    Number(casa.fondo_reserva) +
                    casa.gastos_extras.reduce(
                        (acc, g) => acc + Number(g.monto),
                        0
                    ),
                fecha_pago_limite: "25/11/2025",
                mensaje_importante: "Recuerden pagar a tiempo",
            };

            const html = generarTemplateGastoComunPDF(datos);
            const rutaRelativa = path.join("upload", `${datos.casa}-${datos.mes_gasto}-${year}.pdf`);
            const rutaAbsoluta = path.join(__dirname, "../", rutaRelativa);

            await generarPDF(html, rutaAbsoluta);

            const residente = await Residente.findOne({
                raw:true,
                where: {
                    id_casa:casa.casa_id,
                    es_representante: true
                }
            })

            const { nombre, apellido, email } = residente
            const nombreCompleto = `${nombre} ${apellido}`
            const asunto = `Gasto Comun Casa ${casa.casa} ${mes} ${year}`
            
            await enviarMailGastoComun(email, asunto, nombreCompleto, rutaAbsoluta, dia, mes, year)

            await GastoComun.create({
                casa: casa.casa_id,
                mes,
                year,
                ruta_pdf: rutaRelativa,
                estado: "enviado"
            }) 
        }

        return res.status(201).json({
            code: 201,
            message: "Gasto común creado exitosamente.",
        });
    } catch (error) {
        console.error("Error al crear gasto común:", error);
        next(error);
    }
};

export const getAllCasas = async (req, res, next) => {
    try {
        const casas = await Casas.findAll();

        return res.status(200).json({
            code: 200,
            message: "Casas obtenidas exitosamente",
            data: casas,
        });
    } catch (error) {
        console.error("Error al crear gasto común:", error);
        next(error);
    }
};
