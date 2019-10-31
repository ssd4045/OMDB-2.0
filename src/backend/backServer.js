const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./passport/local-auth');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// initializations
const app = express();
require('./database');
require('./passport/local-auth');

// middlewares
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});
app.use('/', require('./routes/user'));

app.listen(3001, () => console.log("listening on port 3001"));
