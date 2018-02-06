exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.menu = [
  { slug: '/recipes/new', title: 'Add Recipe' },
  { slug: '/members/new', title: 'Add Family Member' },
  { slug: '/logout', title: 'Logout' },
];