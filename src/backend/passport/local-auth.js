const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser( (id, done) => {
User.findById(id).then(user=>
  done(null, user)
  )
});

passport.use( new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},  (email, password, done) => {
  User.findOne({email: email}).then(user=>{
    if(!user) {
      console.log('NOT USER', user)
      return done(null, false, 'El usuario ingresado no es correcto');
    }
    if(!user.comparePassword(password)) {
      console.log('WRONG PASSWORD')
      return done(null, false, 'La contraseña ingresada no es correcta');
    }
    return done(null, user);
  })
}));

module.exports = passport