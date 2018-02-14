exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.menu = [
  { 
    slug: '/recipes/new',
    title: 'Add Recipe' 
  },
  { 
    slug: '/members/new',
    title: 'Add Family Member' 
  },
  {
    slug: '/logout',
    title: 'Logout'
  },
];

exports.dish_types = [
  {
    title: 'Appetizer',
    slug: '/tags/appetizer'
  },
  {
    title: 'Breakfast',
    slug: '/tags/breakfast'
  },
  {
    title: 'Lunch',
    slug: '/tags/lunch'
  },
  {
    title: 'Dinner',
    slug: '/tags/dinner'
  },
  {
    title: 'Dessert',
    slug: '/tags/dessert'
  }
];