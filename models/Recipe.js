const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name for the recipe!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You have to be logged in'
  }
});

recipeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);