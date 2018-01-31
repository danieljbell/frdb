const express = require('express');
const router = express.Router();
const recipeController =  require('../controllers/recipeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(recipeController.getRecipes));
router.post('/create', recipeController.createRecipe);

module.exports = router;