const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);

require('dotenv').config();

const error = require('./controllers/error');

const app = express();
const store = new sessionStore({
  uri: process.env.MONGO_URI,
  // databaseName:'shop',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(error.get404);

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    // console.log(result,'connected successfully')
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
