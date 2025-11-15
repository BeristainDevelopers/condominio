import { Router } from "express";
import { enviarAviso, getAllResidentes, getResidenteById, updateResidente, deleteResidente, createResidente, getAllCasasAndResidentes } from "../controllers/residentes.controller.js";

const router = Router()

router.get("/get-all-residentes", getAllResidentes);
router.get("/get-casas-and-residentes", getAllCasasAndResidentes);
router.get("/get-residente-id/:id", getResidenteById);
router.put("/update-residente/:id", updateResidente);
router.delete("/delete-residente/:id", deleteResidente);
router.post("/create-residente", createResidente);
router.post("/enviar-anuncio", enviarAviso);

export default router;