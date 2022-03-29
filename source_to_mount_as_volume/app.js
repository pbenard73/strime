const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const checkCart = require('./middleware/checkCart');
const { initDatabase } = require('./database/db');

initDatabase()

const app = express();

app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  roolback: true,
  saveUninitialized: true,
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(checkCart);

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

module.exports = app;
