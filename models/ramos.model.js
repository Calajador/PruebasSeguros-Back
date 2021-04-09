const mongoose = require("mongoose");
const { Schema } = mongoose;

const ramosSchema = new Schema({
  tipo: String,
  codigo: String,
  nombres: [{ pais: String, nombre: String }],
  compañia: String,
  ssn: [String],
  contable: Number,
  fechaInicio: String,
  fechaFin: String,
  motivoBaja: String,
});

const Ramo = mongoose.model("Ramo", ramosSchema);

module.exports = Ramo;
