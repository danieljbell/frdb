const express = require('express');
const router = express.Router();
const recipeController =  require('../controllers/recipeController');
const userController =  require('../controllers/userController');
const authController =  require('../controllers/authController');
const marketingController =  require('../controllers/marketingController');
const { catchErrors } = require('../handlers/errorHandlers');

if (!router.user) {
  router.get('/', userController.loginForm);
} else {
  router.get('/', catchErrors(recipeController.getRecipes));
}

router.post('/create', recipeController.createRecipe);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

module.exports = router;