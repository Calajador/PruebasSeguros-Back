const { populate } = require("../models/user,model");
const User = require("../models/user,model");
const userCTRL = {};

userCTRL.registrar = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      ok: false,
      mensaje: "Este usuario ya existe",
    });
  }

  user = new User({
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    estado: req.body.estado,
    idioma: req.body.idioma,
    addDate: req.body.addDate,
    perfil: req.body.perfil,
  });

  user.password = await user.encryptPassword(user.password);
  await user.save();
  const token = user.generateKJWT();

  res.status(200).json({
    ok: true,
    mensaje: "Usuario registrado",
    user,
    token,
  });
};

userCTRL.listar = async (req, res) => {
  let users = await User.find({}).populate({
    path: "perfil",
    populate: {
      path: "perfilFuncional",
    },
  });

  if (!users) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay usuarios",
    });
  } else {
    res.status(200).json({
      ok: true,
      users,
    });
  }
};

userCTRL.editar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let userUp = await User.findByIdAndUpdate({ _id: id }, { $set: data });

  if (!userUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No ha Usuario",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Usuario Actualizado correctamente",
    userUp,
  });
};

userCTRL.eliminar = async (req, res) => {
  let id = req.params.id;

  let user = await User.findOneAndRemove({ _id: id });

  if (!user) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay Usuario",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Usuario Eliminado",
  });
};

userCTRL.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }); // Comprobamos si el email existe
  const validPassword = await user.validatePassword(password); //Comprobamos que la password coincide

  //Si NO se encuentra el usuario
  if (!user)
    return res.status(400).json({
      ok: false,
      mensaje: "Usuario No encontrado",
    });

  //Si la password NO coincide
  if (!validPassword)
    return res.status(400).json({
      ok: false,
      mensaje: "Password Incorrecta",
    });

  const token = user.generateKJWT();
  // Si todo esta bien lo devolvemos
  res.status(200).json({
    ok: true,
    user,
    token,
  });
};

userCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const user = await (await User.findOne({ _id: id }))
    .populate("Perfil")
    .populate("perfilFuncional");

  res.status(200).send({ user });
};

module.exports = userCTRL;
