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
    slug: '/tags/Appetizer'
  },
  {
    title: 'Breakfast',
    slug: '/tags/Breakfast'
  },
  {
    title: 'Lunch',
    slug: '/tags/Lunch'
  },
  {
    title: 'Dinner',
    slug: '/tags/Dinner'
  },
  {
    title: 'Dessert',
    slug: '/tags/Dessert'
  }
];