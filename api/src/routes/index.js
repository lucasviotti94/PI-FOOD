const { Router } = require('express');
const recipesMW = require('./recipes.js');
const dietsMW = require('./diets.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesMW);
router.use('/diets', dietsMW);


module.exports = router;
