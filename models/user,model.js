const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const UserSchema = new Schema({
  usuario: String,
  nombre: String,
  email: String,
  password: String,
  estado: String,
  idioma: String,
  addDate: { type: Date, default: Date.now },
  perfil: { type: Schema.ObjectId, ref: "Perfil" },
});

UserSchema.methods.generateKJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      usuario: this.usuario,
      nombre: this.nombre,
      email: this.email,
      estado: this.nombre,
      idioma: this.idioma,
      password: this.password,
      perfil: this.perfil,
    },
    config.secret
  );
};

UserSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
