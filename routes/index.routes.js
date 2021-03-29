const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const user = require("../controllers/user.controller");
const seguro = require("../controllers/seguro.controller");
const persona = require("../controllers/persona.controller");
const siniestro = require("../controllers/siniestros.controller");
const busqueda = require("../controllers/busqueda.controller");
const pf = require("../controllers/perfilFuncional.controller");
const perfil = require("../controllers/perfil.controller");
const ramo = require("../controllers/ramos.controller");

//Rutas Usuarios
router.post("/registrar", user.registrar);
router.get("/usuarios/", verifyToken.auth, user.listar);
router.get("/usuarios/:id", verifyToken.auth, user.obtener);
router.patch("/usuarios/editar/:id", verifyToken.auth, user.editar);
router.delete("/usuarios/eliminar/:id", verifyToken.auth, user.eliminar);
router.post("/login", user.login);

//Rutas Perfil
router.post("/perfil/registrar", verifyToken.auth, perfil.registrar);
router.get("/perfil", verifyToken.auth, perfil.listar);
router.get("/perfil/:id", verifyToken.auth, perfil.obtener);
router.patch("/perfil/editar/:id", verifyToken.auth, perfil.actualizar);
router.delete("/perfil/eliminar/:id", verifyToken.auth, perfil.eliminar);

//Rutas Pf
router.post("/pf/registrar", verifyToken.auth, pf.registrar);
router.get("/pf", verifyToken.auth, pf.listar);
router.get("/pf/:id", verifyToken.auth, pf.obtener);
router.patch("/pf/editar/:id", verifyToken.auth, pf.actualizar);
router.delete("/pf/eliminar/:id", verifyToken.auth, pf.eliminar);

//Rutas Seguros
router.post("/seguros/registrar", verifyToken.auth, seguro.registrar);
router.get("/seguros", verifyToken.auth, seguro.listar),
  router.get("/seguros/:id", verifyToken.auth, seguro.obtener),
  router.patch("/seguros/editar/:id", verifyToken.auth, seguro.editar),
  router.delete("/seguros/eliminar/:id", verifyToken.auth, seguro.eliminar),
  //Rutas Personas
  router.post("/personas/registrar", verifyToken.auth, persona.registrar);
router.get("/personas", verifyToken.auth, persona.listar);
router.get("/personas/:id", verifyToken.auth, persona.obtener);
router.patch("/personas/editar/:id", verifyToken.auth, persona.actualizar);
router.delete("/personas/eliminar/:id", verifyToken.auth, persona.eliminar);

//Rutas Siniestros
router.post("/siniestros/registrar", verifyToken.auth, siniestro.registrar);
router.get("/siniestros", verifyToken.auth, siniestro.listar);
router.get("/siniestros/:id", verifyToken.auth, siniestro.obtener);
router.patch("/siniestros/editar/:id", verifyToken.auth, siniestro.editar);
router.delete("/siniestros/eliminar/:id", verifyToken.auth, siniestro.eliminar);

//Rutas Ramos
router.post("/ramos/registrar", verifyToken.auth, ramo.registrar);
router.get("/ramos", verifyToken.auth, ramo.listar);
router.get("/ramos/:id", verifyToken.auth, ramo.obtener);
router.patch("/ramos/editar/:id", verifyToken.auth, ramo.actualizar);
router.delete("/ramos/eliminar/:id", verifyToken.auth, ramo.eliminar);

//Rutas Busquedas
router.post("/todo/:busqueda", verifyToken.auth, busqueda.getTodo);

module.exports = router;
