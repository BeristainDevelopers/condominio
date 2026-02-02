import { generarTemplateGastoComunPDF } from "../templates/gastocomun.js";
import { generarTemplateInformeGlobalPDF } from "../templates/informeGlobal.js";
import { generarPDF } from "../services/generarPDF.js";
import { getCurrentDirectory } from "../utils/path.js";
import * as path from "path";
import { fileURLToPath } from "url";
import { Casas } from "../models/Casas.model.js";
import { GastoComun } from "../models/GastosComunes.model.js";
import { enviarMailGastoComun } from "../services/email.services.js";
import { Residente } from "../models/Residentes.model.js";
import { sequelize } from "../database/database.js";
import fs from "fs";

const __dirname = getCurrentDirectory(fileURLToPath(import.meta.url));

export const generarGastosComunes = async (req, res, next) => {
    try {
        const { fondo_reserva, gasto_comun, gastos_extras, fecha } = req.body;
        const fechaArray = fecha.split("-");
        const year = fechaArray[0];
        const mes = Number(fechaArray[1])
        const dia = fechaArray[2];
        console.log(fechaArray);
        console.log(mes);

        const mesesNombres = {
            1: "Enero",
            2: "Febrero",
            3: "Marzo",
            4: "Abril",
            5: "Mayo",
            6: "Junio",
            7: "Julio",
            8: "Agosto",
            9: "Septiembre",
            10: "Octubre",
            11: "Noviembre",
            12: "Diciembre",
        };

        let extrasParseados = [];

        extrasParseados = JSON.parse(gastos_extras);

        const casas = await Casas.findAll({
            raw: true,
        });

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
                fecha_informe: `${dia}/${mes}/${year}`,
                casa: casa.casa,
                mes_gasto: mesesNombres[mes],
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
                        0,
                    ),
                fecha_pago_limite: "25/11/2025",
                mensaje_importante: "",
            };

            const html = generarTemplateGastoComunPDF(datos);
            const rutaRelativa = path.join(
                "upload",
                `${datos.casa}-${datos.mes_gasto}-${year}.pdf`,
            );
            const rutaAbsoluta = path.join(__dirname, "../", rutaRelativa);

            await generarPDF(html, rutaAbsoluta);

            const residente = await Residente.findOne({
                raw: true,
                where: {
                    id_casa: casa.casa_id,
                    es_representante: true,
                },
            });

            const { nombre, apellido, email } = residente;
            const nombreCompleto = `${nombre} ${apellido}`;
            const asunto = `Gasto Comun Casa ${casa.casa} - ${mesesNombres[mes]} de ${year}`;

            await enviarMailGastoComun(
                email,
                asunto,
                nombreCompleto,
                rutaAbsoluta,
                mesesNombres[mes],
                year,
            );

            await GastoComun.create({
                casa: casa.casa_id,
                mes,
                year,
                ruta_pdf: rutaRelativa,
                estado: "enviado",
            });
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

export const generarInformGlobal = async (req, res, next) => {
    try {
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
                    {
                        concepto: "Jardinero",
                        comprobante: "V 39",
                        monto: 120000,
                    },
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

        const html = generarTemplateInformeGlobalPDF(datos);

        const rutaRelativa = path.join(
            "upload",
            `informe-global.pdf`,
        );
        const rutaAbsoluta = path.join(__dirname, "../", rutaRelativa);

        await generarPDF(html, rutaAbsoluta);

        await enviarMailGastoComun(
            "alejandro_beristain@hotmail.com",
            "informe global",
            "Alejandro Beristain",
            rutaAbsoluta,
            "Enero",
            2026,
        );
        return res.status(200).json({
            code: 200,
            message: "Informe global generado exitosamente.",
        });
    } catch (error) {
        console.error("Error al generar informe global:", error);
        next(error);
    }
};
export const enviarGastoComunPorMail = async (req, res, next) => {
    try {
        const mesesNombres = {
            1: "Enero",
            2: "Febrero",
            3: "Marzo",
            4: "Abril",
            5: "Mayo",
            6: "Junio",
            7: "Julio",
            8: "Agosto",
            9: "Septiembre",
            10: "Octubre",
            11: "Noviembre",
            12: "Diciembre",
        };
        const { idDocumento } = req.params;

        const documento = await GastoComun.findOne({
            where: {
                id: idDocumento,
            },
        });

        const rutaAbsoluta = `src/${documento.ruta_pdf}`;
        const casa = documento.casa;
        const mes = documento.mes;
        const año = documento.year;

        const representante = await Residente.findOne({
            where: {
                id_casa: casa,
                es_representante: true,
            },
        });

        const emailRepresentante = representante.email;
        const nombreCompleto = `${representante.nombre} ${representante.apellido}`;
        const asunto = `Re-Envío Gastos Comunes ${mesesNombres[mes]} de ${año}`;

        await enviarMailGastoComun(
            emailRepresentante,
            asunto,
            nombreCompleto,
            rutaAbsoluta,
            mesesNombres[mes],
            año,
        );

        return res.status(200).json({
            code: 200,
            message: "Gasto común enviado exitosamente.",
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

export const getAllGastosComunes = async (req, res, next) => {
    try {
        const gastosComunes = await GastoComun.findAll({
            include: [
                {
                    model: Casas,
                    as: "gasto_casa",
                },
            ],
        });

        const years = await GastoComun.findAll({
            attributes: [
                [sequelize.fn("DISTINCT", sequelize.col("year")), "year"],
            ],
            raw: true,
        });

        const meses = [
            { id: 1, nombre: "Enero" },
            { id: 2, nombre: "Febrero" },
            { id: 3, nombre: "Marzo" },
            { id: 4, nombre: "Abril" },
            { id: 5, nombre: "Mayo" },
            { id: 6, nombre: "Junio" },
            { id: 7, nombre: "Julio" },
            { id: 8, nombre: "Agosto" },
            { id: 9, nombre: "Septiembre" },
            { id: 10, nombre: "Octubre" },
            { id: 11, nombre: "Noviembre" },
            { id: 12, nombre: "Diciembre" },
        ];

        const documentos = {
            gastosComunes,
            meses,
            years,
        };

        return res.status(200).json({
            code: 200,
            message: "gastos comunes obtenidos exitosamente",
            data: documentos,
        });
    } catch (error) {
        console.error("Error al crear gasto común:", error);
        next(error);
    }
};
