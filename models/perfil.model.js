const mongoose = require("mongoose");
const { Schema } = mongoose;

const perfilSchema = new Schema({
  code: String,
  nombre: String,
  descripcion: String,
  observaciones: String,
  perfilFuncional: { type: Schema.ObjectId, ref: "PerfilFuncional" },
});

const Perfil = mongoose.model("Perfil", perfilSchema);

module.exports = Perfil;
