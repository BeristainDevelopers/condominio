import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Cargos = sequelize.define("Cargos", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
  }, {
    tableName: "cargos",
    timestamps: true,
  });