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
  req.session.isLoggedIn = true;
  res.redirect('/');
};
