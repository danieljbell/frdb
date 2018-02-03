const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

exports.homePage = (req, res) => {
  res.render('index', {
    title: 'Hey There!'
  });
}

exports.createRecipe = async (req, res) => {
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