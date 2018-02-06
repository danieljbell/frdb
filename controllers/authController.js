const passport = require('passport');

exports.loginScreen = (req, res) => {
  res.render('login', {
    title: 'Login!'
  });
};

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/recipes',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You successfully logged out');
  res.redirect('/');
};