exports.getLogin = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Login',
    path: '/login',
  });
};
