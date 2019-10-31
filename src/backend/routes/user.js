const router = require('express').Router();
const passport = require('../passport/local-auth');
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


router.post('/signin', (req,res,next)=>{
  passport.authenticate('local-signin', function(err,user,info){
    if(!user){
      return res.send(false)
    }
    if (user){
      req.logIn(user, function(err){
        if (err) return res.send(false)
        return res.send(user)
      })
    }
  })(req,res,next)
})

// router.post('/signin', passport.authenticate('local-signin'),(req,res,next)=>
// { 
//   res.send(req.user)
//   console.log("REQ.USER ESSSSSS: ",req.user)
// })

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


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;