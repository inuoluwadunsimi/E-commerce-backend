const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport');
require('dotenv').config();

//using sendgrid
// const sgmail = require('@sendgrid/mail');
// sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danielolaoladeinde@gmail.com',
    pass: 'xpzpbjmpacyrnxhn',
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password');
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash('error', 'Email already exists,kindly input another');
        return res.redirect('/login');
      }
      return bcrypt.hash(password, 12).then((hashedPassowrd) => {
        const user = new User({
          email: email,
          password: hashedPassowrd,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect('/login');
      //using sendgrid
      //   const msg = {
      //     to: email,
      //     from: 'danielolaoladeinde@gmail.com',
      //     subject: 'This should work I hope',
      //     text: 'Welcome and thanks for signing up',
      //   };

      //   return sgmail.send(msg);

      return transporter.sendMail({
        to: email,
        from: 'danielolaoladeinde@gmail.com',
        subject: 'Signup Succeded',
        html: '<h1> You successfully signed up, welcome to the goodlife  </h1>',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
    errorMessage: message,
  });
};
