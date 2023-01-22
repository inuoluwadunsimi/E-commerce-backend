const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const error = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63cc89e4cd7031b8c720687d')
    .then((user) => {
      req.user = user
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

mongoose
  .connect(
    'mongodb+srv://Inuoluwadunsimi:Thesaneman12_@human.a4aprmo.mongodb.net/shop'
  )
  .then((result) => {
    const user = new User({
      userName: 'Boy',
      email: 'boy@test.com',
      cart: {
        items: [],
      },
    });
    if (!user) {
      user.save();
    }
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
