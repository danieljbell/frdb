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
  },
  dish_type: {
    type: [String],
    required: true
  },
  ingredients: [String]
});

recipeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

recipeSchema.statics.getType = function() {
  return this.aggregate([
    { $unwind: '$dish_type' },
    { $group: { _id: '$dish_type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}

module.exports = mongoose.model('Recipe', recipeSchema);