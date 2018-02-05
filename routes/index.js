const express = require('express');
const router = express.Router();
const recipeController =  require('../controllers/recipeController');
const userController =  require('../controllers/userController');
const authController =  require('../controllers/authController');
const marketingController =  require('../controllers/marketingController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(recipeController.getRecipes));

router.get('/recipes', catchErrors(recipeController.getRecipes));

router.get('/add', recipeController.addRecipe);

router.post('/recipe/create', recipeController.createRecipe);
router.post('/recipe/:recipe_id', recipeController.updateRecipe);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/recipe/:slug', catchErrors(recipeController.getRecipeBySlug));


router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

module.exports = router;