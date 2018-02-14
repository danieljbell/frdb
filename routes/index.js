const express = require('express');
const router = express.Router();
const recipeController =  require('../controllers/recipeController');
const userController =  require('../controllers/userController');
const authController =  require('../controllers/authController');
const marketingController =  require('../controllers/marketingController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', 
  authController.checkAuth,
  catchErrors(recipeController.getRecipes)
);

router.get('/recipes',
  authController.checkAuth,
  catchErrors(recipeController.getRecipes)
);

router.get('/recipes/new', 
  authController.checkAuth,
  recipeController.addRecipe
);

router.post('/recipes/create', 
  recipeController.upload,
  catchErrors(recipeController.resize),
  catchErrors(recipeController.createRecipe)
);
router.post('/recipes/:recipe_id', 
  recipeController.upload,
  catchErrors(recipeController.resize),
  catchErrors(recipeController.updateRecipe)
);

router.get('/tags', 
  authController.checkAuth,
  catchErrors(recipeController.getRecipeByType)
);
router.get('/tags/:tag', 
  authController.checkAuth,
  catchErrors(recipeController.getRecipeByType)
);

router.get('/login', authController.loginScreen);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/recipes/:slug', 
  authController.checkAuth,
  catchErrors(recipeController.getRecipeBySlug)
);

router.get('/members/new',
  authController.checkAuth,
  userController.createUser
);


router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

module.exports = router;