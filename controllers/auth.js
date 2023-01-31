const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  //   const isLoggedIn = req.get('Cookie').trim().split('=')[1];
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('63cc89e4cd7031b8c720687d')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
