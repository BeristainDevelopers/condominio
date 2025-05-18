import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Administracion = sequelize.define("Administracion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_residente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    termino: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  }, {
    tableName: "administraciones",
    timestamps: true,
  });