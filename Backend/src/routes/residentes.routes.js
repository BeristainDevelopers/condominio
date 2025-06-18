import { Router } from "express";
import { getAllResidentes, getResidenteById, updateResidente } from "../controllers/residentes.controller.js";

const router = Router()

router.get("/get-all-residentes", getAllResidentes)
router.get("/get-residente-id/:id", getResidenteById)
router.put("/update-residente/:id", updateResidente);

export default router