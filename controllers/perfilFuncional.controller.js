const PF = require("../models/perfilFuncional");
PFCTRL = {};

PFCTRL.listar = async (req, res) => {
  let pf = await PF.find();

  if (!pf) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay perfiles funcionales",
    });
  } else {
    res.status(200).json({
      ok: true,
      pf,
    });
  }
};

PFCTRL.registrar = async (req, res) => {
  let data = req.body;

  let pf = new PF({
    code: data.code,
    nombre: data.nombre,
    estado: data.estado,
    permiso: data.permiso,
    addDate: data.addDate,
  });

  await pf.save((err, result) => {
    if (err) {
      res.status(500).send("Error en el servidor");
    } else {
      if (result) {
        res.status(200).json({
          ok: true,
          mensaje: "Perfil Funcional Registrado",
          result,
        });
      } else {
        res.status(403).send("EL Perfil Funcional no se ha podido registrar");
      }
    }
  });
};

PFCTRL.actualizar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let pfUp = await PF.findByIdAndUpdate({ _id: id }, { $set: data });

  if (!pfUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No ha perfil funcional",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Perfil Funcional Actualizado correctamente",
    pfUp,
  });
};

PFCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const pf = await PF.findOne({ _id: id });

  res.status(200).send({ pf: PF });
};

PFCTRL.eliminar = async (req, res) => {
  let id = req.params.id;

  let pf = await PF.findOneAndRemove({ _id: id });

  if (!pf) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay Perfil Funcional",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Perfil Funcional Eliminado",
  });
};

module.exports = PFCTRL;
