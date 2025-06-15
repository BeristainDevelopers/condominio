import { Administrador } from "../models/Administradores.model.js";
import { createToken, hashPassword, verifyToken } from "../services/auth.services.js";
import { validateUserData, userIfExist, userNotExist } from "../services/validateUserData.js";
import { normalizeEmail } from "../utils/normalize.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../services/email.services.js";

export const createUser = async (req, res, next) => {
    try {
        const { nombre, apellido, rut, email, password } = req.body;

        //Se valida que el usuario no exista en la base de datos
        await userIfExist(email, rut);
        //se validan que la información personal cumpla ciertas condiciones
        validateUserData(nombre, apellido, rut, email, password);

        const hash = hashPassword(password);

        await Administrador.create({
            nombre,
            apellido,
            rut,
            email: normalizeEmail(email),
            password_hash: hash
        });

        sendEmail(normalizeEmail(email), "registro", nombre);

        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
        });
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en createUser Controller", error);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const token = req.token

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
            });

        res.status(200).json({
            code: 200,
            message: "Inicio de sesión Exitoso"
        });
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en login Controller", error);
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        //Verifica si el usuario no existe en la base de datos
        await userNotExist(email);

        const user = await Administrador.findOne({ raw: true, where: { email } });

        const token = createToken(email, "30m");

        sendEmail(email, "recover-password", user.nombre, token);

        res.status(200).json({
            code: 200,
            message:
                "Email de recuperación de contraseña enviado correctamente",
        });
    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const hash = hashPassword(password);
        await Administrador.update(
            {
                password_hash: hash,
            },
            {
                where: { email },
            }
        );

        res.status(200).json({
            code: 200,
            message: "Contraseña modificada con éxito",
        });
    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};

export const getAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            return res.status(401).json({ message: "No autenticado" });
        }

        const data = await verifyToken(token); 
        const usuario = data.data;

        return res.status(200).json({ usuario });
    } catch (error) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        logger.error("Ha ocurrido un error en getAuthenticatedUser Controller", error);
        return res.status(401).json({ message: "Error de autenticación" });
    }
};

export const logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    res.status(200).json({ 
        code:200,
        message: "Sesión cerrada exitosamente" 
    });
};
