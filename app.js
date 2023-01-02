const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const error = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63b07f6b7f350b1c214fc7f5")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));

  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

mongoConnect(() => {
  if()
  app.listen(4000);
});
