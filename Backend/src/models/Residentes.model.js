import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Residente = sequelize.define('Residente', {
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
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    id_casa:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    es_representante:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'residente',
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt"
});
