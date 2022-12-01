const { Router } = require('express');
const { getRecipes, getByIdDB, getByIdAPI } = require('./getFunctions.js')
const { Recipe, Diet } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {

    try {
        const { name } = req.query; 
        let recipes = await getRecipes();

        if (name) {
            let recipeByName = await recipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if (recipeByName) {
                let recipeFound = recipeByName.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        image: e.image,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        summary: e.summary,
                        healthScore: e.healthScore,
                        steps: e.steps
                    }
                })
                res.status(200).send(recipeFound);                
            } else res.status(400).send('No existe ninguna receta con ese nombre...');
            
        } else {         
            let allRecipes = recipes.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    image: e.image,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    summary: e.summary,
                    healthScore: e.healthScore,
                    steps: e.steps
                }
            })
           res.status(200).send(allRecipes) 
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error en alguno de los datos provistos');
    }
})


router.get('/:id', async (req, res) => {
    
    const { id } = req.params;
    
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let recipeByIdDB = await getByIdDB(id);
            return res.status(200).json(recipeByIdDB);
        } else {         
            const recipeByIdAPI = await getByIdAPI(id);
            if(recipeByIdAPI.data) {
                let recipeDetail = {
                    name: recipeByIdAPI.data.title,
                    image: recipeByIdAPI.data.image,
                    cuisines: recipeByIdAPI.data.cuisines,
                    dishTypes: recipeByIdAPI.data.dishTypes,                    
                    dietTypes: recipeByIdAPI.data.diets,
                    summary: recipeByIdAPI.data.summary,
                    healthScore: recipeByIdAPI.data.healthScore,
                    steps: (recipeByIdAPI.data.analyzedInstructions[0] && recipeByIdAPI.data.analyzedInstructions[0].steps ? recipeByIdAPI.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }})
                    :'')
                }
                res.status(200).send(recipeDetail);
            }
        }
    } catch {
        return res.status(400).send('Receta no encontrada.');
    }
})

router.post('/', async (req, res, next) => {

    try {
        const { name, summary, healthScore, steps, dietTypes } = req.body;            
        const newRecipe = await Recipe.create(req.body);
        console.log(dietTypes)

        dietTypes.map(async (d) => {
            let typeByDB = await Diet.findAll({ where: {name: d} })
            newRecipe.addDiet(typeByDB)
        })

        res.status(200).send(newRecipe)
        console.log(newRecipe)
    } catch (error ){        
        next(error);
    }
});

module.exports = router;