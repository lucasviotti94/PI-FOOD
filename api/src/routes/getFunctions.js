const { Recipe, Diet } = require("../db.js")
const { API_KEY } = process.env
const axios = require("axios");

// typesDB son los tipos de dietas que tenemos en la base de datos (vegetarian, vegan, glutenFree + las dietas que vienen de la API externa)
const typesDB = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free'];


const getInfoDB = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getInfoAPI = async () => {

    const responseAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)

    const recipeInfo = responseAPI.data.results.map(r => {
        return {
            id: r.id,
            image: r.image,
            name: r.title,
            dietTypes: r.diets,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0]?.steps.map(r => {                
                return {
                    number: r.number,
                    step: r.step
                }
            })
        }
    })
    return recipeInfo;
};

const getByIdDB = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getByIdAPI = async (id) => {

    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
}

const getRecipes = async () => {

    const infoAPI = await getInfoAPI();
    const infoDB = await getInfoDB();
    const infoAll = infoAPI.concat(infoDB);    
    return infoAll;
}


module.exports = {
    getInfoDB,
    getInfoAPI,
    getByIdDB,
    getByIdAPI,
    getRecipes,
    typesDB
}