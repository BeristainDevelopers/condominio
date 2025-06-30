import { Router } from "express";
import { generarGastosComunes, getAllCasas } from "../controllers/gastosComunes.controller.js";
import { issueTokenMiddleware, verifyTokenMiddleware } from "../middlewares/login.middleware.js";


const router = Router()

router.get("/get-casas", getAllCasas)

router.post("/generar-gasto-comun", generarGastosComunes)




export default router