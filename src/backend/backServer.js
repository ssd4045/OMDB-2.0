const express = require('express');
const session = require('express-session');
const passport = require('./passport/local-auth');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// initializations
const app = express();
require('./database');

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors())

app.use(session({
  secret : 'foo',resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('foo'));

app.use('/', require('./routes/user'));

app.listen(3001, () => console.log("listening on port 3001"));
