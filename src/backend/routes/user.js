const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user')
const Fav = require('../models/fav')

router.get('/test', function (req,res){
  let obj = {
    session: req.session,
    user: req.user,
    auth: req.isAuthenticated()
  }
  res.json(obj)
})

router.post('/signup', (req, res) => {
  console.log("registrando usuario")
  var user = new User();
  user.email = req.body.email;
  user.password = user.encryptPassword(req.body.password);
  console.log("REGISTRANDOOO:",user)
  user.save()
    .then(user => res.send(user))
}) 

router.post('/signin', passport.authenticate('local'),(req,res,next)=>
{ 
  console.log(req.session)
  res.send(req.user)
})

router.post('/addtofav', (req,res,next)=>
{
    var fav= new Fav();
  fav.movieID= req.body.movieID  
  fav.movieTitle= req.body.movieTitle;
  fav.movieYear= req.body.movieYear;
  fav.movieImage= req.body.movieImage;
  fav.save()
    .then(fav => res.send(fav))
    .catch(console.log)

})

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
router.get('/me', (req, res, next) => {
  res.send({user:req.user, session:req.session})
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;