import { Router } from "express";
import { generarGastosComunes } from "../controllers/gastosComunes.controller.js";
import { issueTokenMiddleware, verifyTokenMiddleware } from "../middlewares/login.middleware.js";


const router = Router()

router.post("/", generarGastosComunes)


export default router