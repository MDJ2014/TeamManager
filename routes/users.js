var express = require('express');
var router = express.Router();
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;
var Player = require('../models/playerModel').Player;
var mid = require('../middleware');


// function writeError(message) {
//   res.status(400);
//   res.json({ message: message, status: 400 });
//   res.end();
// }

/* GET users listing. */
//mid.requiresAdmin
router.get('/', function (req, res, next) {
  User.find({})
    .exec(
      function (err, users) {
        if (err) return next(err);
        res.json(users);

      });
});




/*Get registration page mid.loggedOut */
router.get('/register',  function (req, res, next) {

  res.json({title: "register"});

});

/*User Login */
/*Get form  mid.loggedOut*/
router.get('/login', function (req, res, next) {
  res.json({title: "login"});
 // return res.render('login');
});


router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/home');
      }
    });
  }
});



/*Profile* mid.requiresLogin,*/
router.get('/profile', function (req, res, next) {
  res.status(200);

   if(! req.session.userId){
    var err = new Error("You are not authorized to view this page!");
    err.status = 403;
   // return writeError("You are not authorized to view this page!");
   //return res.render('newError',{newMessage: "You are not authorized to view this page!"})
   return next(err);
  }

var profileData={
firstname:"",
lastname:"",
username:"",
street:"",
city:"",
state:"",
zip:"",
phone:"",
email:"",
players:"",
pay:""
};




//req.session.userId
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) {
        return next(err);
      } else {
         // profileData.user=user;
         profileData.firstname = user.name.firstName;
         profileData.lastname = user.name.lastName;
         profileData.username = user.userName;
         profileData.street = user.userAddress.street;
         profileData.city = user.userAddress.city;
         profileData.state = user.userAddress.state;
         profileData.zip = user.userAddress.zip;
         profileData.phone=user.userPhone;
         profileData.email=user.userEmail;

          Player.find({parent: req.session.userId})
          .exec(function(err,players){
            if(err){
              return next(err);
            }else{
              profileData.players =players;
           
              Payment.find({payerId: req.session.userId})
              .exec(function(err,payment){
                if(err){return next(err)
                }else{
                  profileData.pay=payment;

                  res.status(200);
                  return res.json(profileData);

                }
              }
          
              );
            }
          }


          )



      //  return res.render('profile', { title: "Profile", name: user.name.firstName });
      }
    });


});


/**Get Individual User */
router.get('/user', mid.requiresLogin, function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) return next(err);
      res.status(201);
      res.json(user);
      //render update form and delete
    });
});





router.post('/login', function (req, res, next) {

  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (err, user) {
      if (err || !user) {
        var err = new Error("Wrong email or password");
        res.status(401);
       // res.json({"error": "Wrong email or password"});
        return next(err);
      } else {
        req.session.userId = user._id;
        req.session.userName = user.userName;
        return res.redirect('/users/profile');
      }
    });
  } else {
    var err = new Error("Email and Password are required.");
    res.status(401);
    // res.json({"error": "Email and Password are required"});
    return next(err);
  }



});





/*Sign up new user*/
router.post('/register', function (req, res, next) {


  if (req.body.userEmail && req.body.firstName && req.body.lastName && req.body.userName && req.body.passWord && req.body.confirmPassword) {

    //confirm passwords match
    if (req.body.passWord != req.body.confirmPassword) {
      var err = new Error("Passwords do not match!");
      res.status(400);
      return next(err);
    }

    let userData = {
      name: { firstName: req.body.firstName, lastName: req.body.lastName },
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      passWord: req.body.passWord
    };

    User.create(userData, function (err, user) {
      if (err) return next(err);
      req.session.userId = user._id;
      req.session.userName = user.userName;
     // return res.redirect('/users/profile');
     return res.json(user);
    });


  } else {
    var err = new Error("All fields are required.");
    res.status(400);
    return next(err);
  }

});




router.put('/user/update', mid.requiresLogin, function (req, res, next) {
  var newData = req.body;

  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) return next(err);

      user.update(newData, {new:true})
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);
        });

    });
});






/**Delete User */
router.delete('/user/delete', mid.requiresAdmin, function(req, res, next){
  User.findByIdAndDelete(req.body.userId, function (err, deletedDoc) {
    if (err) return next(err);
    Player.deleteMany({ parent: req.body.userId }, function (err, playerDocs) {
      if (err) return next(err);
      res.status(200);
      res.json(deletedDoc);
    })


  })
})
















module.exports = router;
