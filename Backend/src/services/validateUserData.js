import { ValidationError } from "../errors/TypeError.js";
import { isValidName, isValidEmail, isValidPassword } from "../utils/validators.js";
import { Administrador } from "../models/Administradores.model.js";

export const validateUserData = (nombre, email, password) => {

    if (!isValidName(nombre)) {
        throw new ValidationError("El Nombre Proporcionado no cumple con el formato", {
            field: "Nombre",
        });
    }

    if (!isValidEmail(email)) {
        throw new ValidationError("El Email Proporcionado no es válido", {
            field: "Email",
        });
    }

    if (!isValidPassword(password)) {
        throw new ValidationError("La contraseña debe contener 9 caracteres, 4 letras, 4 números, un caracter especial y como mínimo una mayuscula, una minúscula", {
            field: "Password",
        });
    }
};

export const userIfExist = async (email, rut) => {
    
    if (email) {
        const userByEmail = await Administrador.findOne({
            where: { email }
        });
        if (userByEmail) {
            throw new ValidationError("Ya existe un usuario registrado con ese Email", {
                field: "email",
            });
        }
    }
    if (rut) {
        const userByRut = await Administrador.findOne({
            where: { rut }
        });
        if (userByRut) {
            throw new ValidationError("Ya existe un usuario registrado con ese RUT", {
                field: "RUT",
            });
        }
    }
}

export const userNotExist = async (email) => {
    
    if (email) {
        const userByEmail = await Administrador.findOne({
            where: { email }
        });
        if (!userByEmail) {
            throw new ValidationError("Usuario no encontrado", {
                field: "email",
            });
        }
    }
    
}