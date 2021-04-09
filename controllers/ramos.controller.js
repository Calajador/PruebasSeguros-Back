const Ramo = require("../models/ramos.model");
const ramosCTRL = {};

ramosCTRL.listar = async (req, res) => {
  let ramos = await Ramo.find();

  if (!ramos) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay ramos",
    });
  } else {
    res.status(200).json({
      ok: true,
      ramos,
    });
  }
};

ramosCTRL.registrar = async (req, res) => {
  let data = req.body;
  let ramo = await Ramo.findOne({ tipo: data.tipo });

  if (ramo) {
    return res.status(400).json({
      ok: false,
      mensaje: "Este Ramo ya existe",
    });
  }

  let nuevoRamo = new Ramo({
    tipo: data.tipo,
    codigo: data.codigo,
    nombres: data.nombres,
    compañia: data.compañia,
    ssn: data.ssn,
    contable: data.contable,
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    motivoBaja: data.motivoBaja,
  });

  await nuevoRamo.save((err, result) => {
    if (err) {
      res.status(500).send("Error en el servidor");
    } else {
      if (result) {
        res.status(200).json({
          ok: true,
          mensaje: "Ramo Registrada",
          result,
        });
      } else {
        res.status(403).send("El Ramo no se ha podido registrar");
      }
    }
  });
};

ramosCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const ramo = await Ramo.findOne({ _id: id });

  res.status(200).send({ ramo: ramo });
};

ramosCTRL.actualizar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let ramoUp = await Ramo.findByIdAndUpdate({ _id: id }, { $set: data });

  if (!ramoUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay ramo",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Ramo Actualizado correctamente",
    ramoUp,
  });
};

ramosCTRL.eliminar = async (req, res) => {
  let id = req.params.id;

  let ramo = await Ramo.findOneAndRemove({ _id: id });

  if (!ramo) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay ramo",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Ramo eliminado",
  });
};

module.exports = ramosCTRL;
