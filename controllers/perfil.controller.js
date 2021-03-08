const Perfil = require("../models/perfil.model");
PerfilCTRL = {};

PerfilCTRL.listar = async (req, res) => {
  let pf = await Perfil.find().populate("perfilFuncional");

  if (!pf) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay perfileses",
    });
  } else {
    res.status(200).json({
      ok: true,
      pf,
    });
  }
};

PerfilCTRL.registrar = async (req, res) => {
  let data = req.body;

  let pf = new Perfil({
    code: data.code,
    nombre: data.nombre,
    descripcion: data.descripcion,
    observaciones: data.observaciones,
    perfilFuncional: data.perfilFuncional,
  });

  await pf.save((err, result) => {
    if (err) {
      res.status(500).send("Error en el servidor");
    } else {
      if (result) {
        res.status(200).json({
          ok: true,
          mensaje: "Perfil Registrado",
          result,
        });
      } else {
        res.status(403).send("EL Perfil no se ha podido registrar");
      }
    }
  });
};

PerfilCTRL.actualizar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let pfUp = await Perfil.findByIdAndUpdate({ _id: id }, { $set: data });

  if (!pfUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No ha perfil",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Perfil Actualizado correctamente",
    pfUp,
  });
};

PerfilCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const pf = await Perfil.findOne({ _id: id }).populate("perfilFuncional");

  res.status(200).send({ pf: PF });
};

PerfilCTRL.eliminar = async (req, res) => {
  let id = req.params.id;

  let pf = await Perfil.findOneAndRemove({ _id: id });

  if (!pf) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay Perfil",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Perfil Eliminado",
  });
};

module.exports = PerfilCTRL;
