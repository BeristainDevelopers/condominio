import { Residente } from "../models/Residentes.model.js";
import { Casas } from "../models/Casas.model.js";

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
