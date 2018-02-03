const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

exports.addRecipe = (req, res) => {
  res.render('add', {
    title: 'Add A New Recipe!'
  });
}

exports.createRecipe = async (req, res) => {
  req.body.author = req.user._id;
  const recipe = new Recipe(req.body);
  await recipe.save();
  req.flash('success', 'Recipe has been created!');
  res.redirect('/');
}

exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.render('login', {
    title: 'Recipes',
    recipes
  });
}

exports.getRecipeBySlug = async (req, res, next) => {
  const recipe = await Recipe.findOne({ slug: req.params.slug }).populate('author');
  if (!recipe) return next();
  res.render('recipe', { recipe, title: recipe.name });
};