import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const GastoComun = sequelize.define("GastoComun",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    casa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    ruta_pdf: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM("generado", "enviado", "pagado"),
        defaultValue: "generado",
    },
    },{
        tableName: "gastos_comunes",
        timestamps: true,
    }
);
