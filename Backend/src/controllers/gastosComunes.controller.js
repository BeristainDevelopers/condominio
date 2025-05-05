import { generarTemplateGastoComunPDF } from "../templates/gastocomun.js";
import { generarPDF } from "../services/generarPDF.js";
import { getCurrentDirectory } from "../utils/path.js";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = getCurrentDirectory(fileURLToPath(import.meta.url));

export const generarGastosComunes = async (req, res, next) => {
    try {
        
        const datos = {
            fecha_informe: "18-09-2023", 
            casa: "Casa J" ,
            mes_gasto: "Septiembre",
            gastos: [
                { nombre: "Gasto 1", valor: 1000 },
                { nombre: "Gasto 2", valor: 2000 },
                { nombre: "Gasto 3", valor: 3000 },
            ] , 
            total:"6000" ,
            fecha_pago_limite: "30-09-2023" ,
            mensaje_importante: "Este es un mensaje importante para la comunidad." ,
        }

        const html = generarTemplateGastoComunPDF(datos);

        const rutaRelativa = path.join("upload", `${datos.casa}.pdf`);
        const rutaAbsoluta = path.join(__dirname, "../", rutaRelativa);

        await generarPDF(html, rutaAbsoluta);

        return res.status(201).json({
            code: 201,
            message: "Gasto común creado exitosamente.",
        });
    } catch (error) {
        console.error("Error al crear gasto común:", error);
        next(error);
    }
}