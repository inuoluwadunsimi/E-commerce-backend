exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').trim().split('=')[1];
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.cookie('loggedIn', true,{
    httpOnly:true,
    // secure:true,
  });
  res.redirect('/');
};
