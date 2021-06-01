const mongoose = require("mongoose");
const { Schema } = mongoose;

const ramosSchema = new Schema({
  tipo: String,
  codigo: String,
  nombres: [{ pais: String, nombre: String }],
  compañia: String,
  ssn: String,
  contable: Number,
  fechaInicio: String,
  fechaFin: String,
  motivoBaja: String,
  approbationModality: String,
  approbationDate: String,
  expedientNumber: Number,
  expedientNumberOutCompany: Number,
  ssnExpedientNumber: Number,
  companyName: String,
  approval: String,
  tramitNumber: Number,
});

const Ramo = mongoose.model("Ramo", ramosSchema);

module.exports = Ramo;
