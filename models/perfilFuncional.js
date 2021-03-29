const mongoose = require("mongoose");
const { Schema } = mongoose;

const perfilFuncionalSchema = new Schema({
  code: String,
  nombre: String,
  estado: String,
  permiso: String,
  addDate: Date,
});

const PerfilFuncional = mongoose.model(
  "PerfilFuncional",
  perfilFuncionalSchema
);

module.exports = PerfilFuncional;
