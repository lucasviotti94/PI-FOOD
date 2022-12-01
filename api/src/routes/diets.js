const { Router } = require('express');
const { typesDB } = require('./getFunctions.js')
const { Recipe, Diet } = require('../db.js');
const db = require('../db.js')

const router = Router();

router.get('/', async (req, res) => {
    try {
        typesDB.forEach(d => {
            Diet.findOrCreate({
                where: { name: d }
            })            
        });
        let diets = await Diet.findAll();       
        let response = diets.map(d => d.name)        
        res.status(200).send(response) 
    } catch (error) {
        res.status(400).send('Error')
    }
})

module.exports = router;