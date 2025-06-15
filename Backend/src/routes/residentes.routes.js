import { Router } from "express";
import { getAllResidentes, getResidenteById } from "../controllers/residentes.controller.js";

const router = Router()

router.get("/get-all-residentes", getAllResidentes)
router.get("/get-residente-id/:id", getResidenteById)

export default router