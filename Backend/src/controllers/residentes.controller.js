import { Residente } from "../models/Residentes.model.js";
import { Casas } from "../models/Casas.model.js";
import { enviarMailAviso } from "../services/email.services.js";

export const getAllResidentes = async (req, res, next) => {
    try {
        const residentes = await Residente.findAll({
            include: [
                {
                    model: Casas,
                    as: "residente_casa",
                },
            ],
        });

        const residentesMap = residentes.map((residente) => ({
            id: residente.id,
            nombre: residente.nombre,
            apellido: residente.apellido,
            rut: residente.rut,
            email: residente.email,
            casa:residente.residente_casa?.nombre,
            id_casa: residente.id_casa,
            es_representante: residente.es_representante,
            activo: residente.activo,
            createdAt: residente.createdAt,
            updatedAt: residente.updatedAt
        }));

        if (!residentes) {
            throw new Error("No hay residentes registrados");
        }

        res.status(200).json({
            code: 200,
            message: "Residentes encontrados con éxito",
            data: residentesMap,
        });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const getResidenteById = async (req, res, next) => {
    try {
        const { id } = req.params

        const residente = await Residente.findOne({
            where:{
                id
            },
            include: [
                {
                    model: Casas,
                    as: "residente_casa",
                },
            ],
        });

        const residenteMap = {
            id: residente.id,
            nombre: residente.nombre,
            apellido: residente.apellido,
            rut: residente.rut,
            email: residente.email,
            casa:residente.residente_casa?.nombre,
            id_casa: residente.id_casa,
            es_representante: residente.es_representante,
            activo: residente.activo,
            createdAt: residente.createdAt,
            updatedAt: residente.updatedAt
        };

        if (!residenteMap) {
            throw new Error("No hay residentes registrados");
        }

        res.status(200).json({
            code: 200,
            message: "Residentes encontrados con éxito",
            data: residenteMap,
        });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const updateResidente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            rut,
            email,
            id_casa,
            es_representante,
            activo
        } = req.body;

        const residente = await Residente.findOne({
            where: { id },
        });

        if (!residente) {
            return res.status(404).json({
                code: 404,
                message: "Residente no encontrado",
            });
        }

        residente.nombre = nombre ?? residente.nombre;
        residente.apellido = apellido ?? residente.apellido;
        residente.rut = rut ?? residente.rut;
        residente.email = email ?? residente.email;
        residente.id_casa = id_casa ?? residente.id_casa;
        residente.es_representante = es_representante ?? residente.es_representante;
        residente.activo = activo ?? residente.activo;

        await residente.save();

        const residenteActualizado = await Residente.findOne({
            where: { id },
            include: [
                {
                    model: Casas,
                    as: "residente_casa",
                },
            ],
        });

        const residenteMap = {
            id: residenteActualizado.id,
            nombre: residenteActualizado.nombre,
            apellido: residenteActualizado.apellido,
            rut: residenteActualizado.rut,
            email: residenteActualizado.email,
            casa: residenteActualizado.residente_casa?.nombre,
            id_casa: residenteActualizado.id_casa,
            es_representante: residenteActualizado.es_representante,
            activo: residenteActualizado.activo,
            createdAt: residenteActualizado.createdAt,
            updatedAt: residenteActualizado.updatedAt
        };

        res.status(200).json({
            code: 200,
            message: "Residente actualizado con éxito",
            data: residenteMap,
        });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const deleteResidente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const residente = await Residente.findOne({ where: { id } });
        if (!residente) {
            return res.status(404).json({
                code: 404,
                message: "Residente no encontrado",
            });
        }
        await residente.destroy();
        res.status(200).json({
            code: 200,
            message: "Residente eliminado con éxito",
        });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const enviarAviso = async(req, res, next) =>{
    try {
        const { casas, asunto, titulo, mensaje } = req.body
        const parsedCasas = typeof casas === "string" ? JSON.parse(casas) : casas;


        for (const casa of parsedCasas) {
            const representante = await Residente.findOne({
                raw:true,
                where:{
                    es_representante:true,
                    id_casa: casa
                }
            })
            console.log(representante);
            const { email, nombre, apellido } = representante
            const nombreCompleto = `${nombre} ${apellido}`

            enviarMailAviso(email, asunto, titulo, nombreCompleto, mensaje)
            
        }
        res.status(200).json({
            code: 200,
            message: "Email enviado correctamente",
        });
    } catch (error) {
        console.log(error);
        next();
    }
};