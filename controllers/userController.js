const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register'
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('first_name');
  req.checkBody('first_name', 'Please enter your first name').notEmpty();
  req.sanitizeBody('last_name');
  req.checkBody('last_name', 'Please enter your last name').notEmpty();
  req.checkBody('email', 'Please enter an email address').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Please enter your password').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Your passwords are not matching!').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return;
  }

  next();
};

exports.register = (req, res, next) => {
  const user = new User({ 
    email: req.body.email, 
    first_name: req.body.first_name,
    last_name: req.body.last_name 
  });
  // const register = promisify(User.register, User);
  User.register(user, req.body.password, function(err, user) {
    console.log('error!');
  })
  next(); // pass to authController.login
};

exports.createUser = (req, res, next) => {
  res.render('register', {
    title: 'Register'
  });
};

exports.editProfile = (req, res, next) => {
  res.render('editProfile', {
    title: 'Edit My Profile'
  });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findOneAndUpdate(
  {
    _id: req.body.user_id
  },
  req.body,
  {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `You successfully updated your profile!`);
  res.redirect(`/profile`);
}