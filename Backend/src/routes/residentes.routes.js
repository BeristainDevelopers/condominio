import { Router } from "express";
import { enviarAviso, getAllResidentes, getResidenteById, updateResidente, deleteResidente } from "../controllers/residentes.controller.js";

const router = Router()

router.get("/get-all-residentes", getAllResidentes)
router.get("/get-residente-id/:id", getResidenteById)
router.put("/update-residente/:id", updateResidente);
router.post("/enviar-anuncio", enviarAviso)
router.delete("/delete-residente/:id", deleteResidente);

export default router