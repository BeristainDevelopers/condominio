import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Administrador = sequelize.define('Administrador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    rut: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING(250),
        allowNull: false,
    }
}, {
    tableName: 'administrador',
    timestamps: true,
});
