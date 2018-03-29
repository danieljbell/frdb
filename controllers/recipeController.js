const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: `That filetype isn't allowed` }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
}

exports.addRecipe = (req, res) => {
  res.render('add', {
    title: 'Add A New Recipe!'
  });
}

exports.removeRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.recipe_id });
  confirmOwner(recipe, req.user);
  await recipe.remove();
  req.flash('success', 'Recipe has been deleted');
  res.redirect('/');
}

exports.createRecipe = async (req, res) => {
  req.body.author = req.user._id;
  const recipe = new Recipe(req.body);
  // console.log(recipe);
  await recipe.save();
  req.flash('success', 'Recipe has been created!');
  res.redirect('/');
}

const confirmOwner = (recipe, user) => {
  if (!recipe.author.equals(user._id)) {
    throw Error('You do not own this recipe, sorry you can\'t update.');
  }
};

exports.editRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id });
  confirmOwner(recipe, req.user);
  res.render('add', {
    title: `Edit ${recipe.name}`,
    recipe
  })
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
  res.redirect(`/recipes/${recipe.slug}`);
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

exports.getRecipeByType = async (req, res) => {
  let tag = req.params.tag;
  tag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const tagQuery = tag || { $exists: true, $ne: [] };

  const tagsPromise = Recipe.getType();
  const recipesPromise = Recipe.find({ dish_type: tagQuery });
  const [tags, recipes] = await Promise.all([tagsPromise, recipesPromise]);

  res.render('index', { tags, title: 'Tags', tag, recipes });
};

