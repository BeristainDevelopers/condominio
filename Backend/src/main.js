import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import gastosComunesRoutes from "./routes/gastosComunes.routes.js";
import residentesRoutes from "./routes/residentes.routes.js";

import { errorHandler } from "./middlewares/errors.middlewares.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const app = express()

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

const origins = ["http://localhost:5173"];
app.use(
    cors({
        origin: origins,
        credentials: true,
    })
);

//Carpeta Publica
app.use("/upload", express.static(path.join(__dirname, "upload")));

//Endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/residentes", residentesRoutes);
app.use("/api/v1/gastos-comunes", gastosComunesRoutes);

//Errors Handler
app.use(errorHandler);
