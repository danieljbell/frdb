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

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findOneAndUpdate(
  {
    _id: req.params.recipe_id
  },
  req.body,
  {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `You successfully updated ${recipe.name}!`);
  res.redirect(`/recipe/${recipe.slug}`);
}



exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.render('index', {
    title: 'Recipes',
    body_class: 'page--recipes-list',
    recipes
  });
}

exports.getRecipeBySlug = async (req, res, next) => {
  const recipe = await Recipe.findOne({ slug: req.params.slug }).populate('author');
  if (!recipe) return next();
  res.render('recipe', { recipe, title: recipe.name });
};