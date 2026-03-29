import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const InformeGlobal = sequelize.define(
    "InformeGlobal",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        mes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ruta_pdf: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("generado", "enviado"),
            allowNull: false,
            defaultValue: "generado",
        },
    },
    {
        tableName: "informes_globales",
        timestamps: true,
    },
);
