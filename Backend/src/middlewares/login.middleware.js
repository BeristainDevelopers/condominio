import { AuthenticationError, UnauthorizedError } from "../errors/TypeError.js";
import logger from "../utils/logger.js";
import { comparePassword, createToken, verifyToken } from "../services/auth.services.js";
import { Administrador } from "../models/Administradores.model.js";



export const issueTokenMiddleware = async(req, res, next) =>{
    try {
        const {email, password } = req.body

        let user = await Administrador.findOne({
            where:{
                email
            }
        })
        
        if (!user){
            throw new UnauthorizedError("Email o contraseña incorrectos")
        }
        
        const userMap = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
        }

        const validatePassword = await comparePassword(password, user.password_hash)

        if(!validatePassword){
            throw new UnauthorizedError("Email o contraseña incorrectos")
        }

        const token = createToken(userMap, "1d")

        req.token = token
        next()

    } catch (error) {
        console.log(error.message)
        logger.error("Ha ocurrido un error en issuetoken Middleware", error)
        next(error);
    } 
}

export const verifyTokenMiddleware = async (req, res, next) => {
    try {
        const tokenFromHeader = req.headers.authorization?.split(" ")[1];
        const tokenFromQuery = req.query.token;
        const tokenFromBody = req.body.token;
        const tokenFromCookie = req.cookies.token;

        const token = tokenFromHeader || tokenFromQuery || tokenFromCookie || tokenFromBody

        if (!token) {
            throw new AuthenticationError("Token no proporcionado");
        }

        const decoded = await verifyToken(token);
        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en authMiddleware Middleware", error);
        next(error);
    }
};