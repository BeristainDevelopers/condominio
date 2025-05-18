import { Administrador } from "./Administradores.model.js";
import { Casas } from "./Casas.model.js";
import { Cargos } from "./Cargos.model.js";
import { Residente } from "./Residentes.model.js";
import { Administracion } from "./Administraciones.model.js";
import { GastoComun } from "./GastosComunes.model.js";

// Casas -> Residentes
Casas.hasMany(Residente, {
  foreignKey: "id_casa",
  sourceKey: "id",
})

Residente.belongsTo(Casas, {
  foreignKey: "id_casa",
  targetKey: "id",
})

// Casas -> GastoComun
Casas.hasMany(GastoComun, {
    foreignKey: "casa",
    sourceKey: "id",
});
GastoComun.belongsTo(Casas, {
    foreignKey: "casa",
    targetKey: "id",
});

// Administracion -> Residente 
Residente.hasMany(Administracion, {
  foreignKey: "id_residente", 
  sourceKey: "id",
});

Administracion.belongsTo(Residente, {
  foreignKey: "id_residente",
  targetKey: "id",
});

// Administracion -> Cargos
Cargos.hasMany(Administracion, {
    foreignKey: "cargo",
    sourceKey: "id",
});
Administracion.belongsTo(Cargos, {
    foreignKey: "cargo",
    targetKey: "id",
});
