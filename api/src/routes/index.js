const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouters = require("./dogsRouters")
const tempRouters = require("./tempRouters")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouters)
router.use("/temperaments", tempRouters)



module.exports = router;
