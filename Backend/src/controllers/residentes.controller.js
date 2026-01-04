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

export const createResidente = async (req, res, next) => {
    try {
        const { nombre, apellido, rut, email, casa, es_representante, activo } = req.body;
        if (!nombre || !apellido || !rut || !email || !casa) {
            return res.status(400).json({
                code: 400,
                message: "Todos los campos obligatorios deben ser completados."
            });
        }

        let casaObj = await Casas.findOne({ where: { nombre: casa } });
        if (!casaObj) {
            throw new Error("No Existe la casa seleccionada");
        }

        const nuevoResidente = await Residente.create({
            nombre,
            apellido,
            rut,
            email,
            id_casa: casaObj.id,
            es_representante: !!es_representante,
            activo: activo !== undefined ? !!activo : true
        });

        res.status(201).json({
            code: 201,
            message: "Residente creado exitosamente",
            data: {
                id: nuevoResidente.id,
                nombre: nuevoResidente.nombre,
                apellido: nuevoResidente.apellido,
                rut: nuevoResidente.rut,
                email: nuevoResidente.email,
                casa: casaObj.nombre,
                id_casa: nuevoResidente.id_casa,
                es_representante: nuevoResidente.es_representante,
                activo: nuevoResidente.activo,
                createdAt: nuevoResidente.createdAt,
                updatedAt: nuevoResidente.updatedAt
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
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

export const getAllCasasAndResidentes = async (req, res, next) => {
    try {
        const casas = await Casas.findAll({
            include: [
                {
                    model: Residente,
                    as: "casas_residente",
                },
            ],
        });

        if (!casas) {
            throw new Error("No hay casas registrados");
        }

        res.status(200).json({
            code: 200,
            message: "Casas y residentes encontrados con éxito",
            data: casas,
        });

    } catch (error) {
        console.log(error);
        next();
    }
};