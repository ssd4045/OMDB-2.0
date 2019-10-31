const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, 'El email ingresado ya existe');
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
  console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    console.log('NOT USER', user)
    return done(null, false, 'El usuario ingresado no es correcto');
  }
  if(!user.comparePassword(password)) {
    console.log('WRONG PASSWORD')
    return done(null, false, 'La contraseña ingresada no es correcta');
  }
  console.log('USER LOGGED IN', user)
  return done(null, user);
}));

module.exports = passport