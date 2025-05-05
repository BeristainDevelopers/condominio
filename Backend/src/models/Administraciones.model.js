export const Administracion = sequelize.define("Administracion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
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