import { Router } from "express";
import { enviarGastoComunPorMail, generarGastosComunes, generarInformGlobal, getAllCasas, getAllGastosComunes } from "../controllers/gastosComunes.controller.js";
import { issueTokenMiddleware, verifyTokenMiddleware } from "../middlewares/login.middleware.js";


const router = Router()

router.get("/get-casas", getAllCasas)
router.get("/get-gastos-comunes", getAllGastosComunes )
router.post("/reenviar-gastos-comunes/:idDocumento",  enviarGastoComunPorMail)

router.post("/generar-gasto-comun", generarGastosComunes)
router.post("/generar-informe-global", generarInformGlobal)




export default router