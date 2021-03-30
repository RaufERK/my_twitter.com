const express = require('express');
const session = require('express-session');

const morgan = require('morgan');

const hbs = require('hbs');

const MongoStore = require('connect-mongo');
const { mongoUrl } = require('../db/mongo');

const protector = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/user');
  next();
};

const middleWares = (app) => {
  hbs.registerPartials('views/partials');
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('view engine', 'hbs');
  app.use(morgan('tiny'));

  app.use(
    session({
      secret: 'sjnknsjnscjcsnkscnksd',
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl }),
    })
  );

  app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.userId = req.session.userId;
    next();
  });
};

module.exports = { middleWares, protector };
