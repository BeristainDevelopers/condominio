import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Casas = sequelize.define("Casas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
  }, {
    tableName: "casas",
    timestamps: false,
  });