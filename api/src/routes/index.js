const { Router } = require('express');//pqt-npm
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require('./country');
const typeRoute = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/country', countryRoute);
router.use('/types', typeRoute);

module.exports = router;
