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
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63b07f6b7f350b1c214fc7f5')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
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
    app.listen(3000)
  }).catch(err=>{
    console.log(err)
  })
