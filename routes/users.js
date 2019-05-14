var express = require('express');
var router = express.Router();
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;
var Player = require('../models/playerModel').Player;
var mid = require('../middleware');




/* GET users listing. */
router.get('/', mid.requiresAdmin, function (req, res, next) {
  User.find({})
    .exec(
      function (err, users) {
        if (err) return next(err);
        res.json(users);

      });
});




/*Get registration page */
router.get('/register', mid.loggedOut, function (req, res, next) {
  //render post form
  res.render('register');

});

/*User Login */
/*Get form*/
router.get('/login', mid.loggedOut, function (req, res, next) {
  return res.render('login');
});


router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});



/*Profile*/
router.get('/profile', mid.requiresLogin, function (req, res, next) {
  // if(! req.session.userId){
  //   var err = new Error("You are not authorized to view this page!");
  //   err.status = 403;
  //   return next(err);
  // }
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) {
        return next(err);
      } else {
        return res.render('profile', { title: "Profile", name: user.name.firstName });
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
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('profile');
      }
    });
  } else {
    var err = new Error("Email and Password are required.");
    err.status = 401;
    return next(err);
  }



});





/*Sign up new user*/
router.post('/register', function (req, res, next) {


  if (req.body.email && req.body.firstname && req.body.lastname && req.body.street && req.body.city && req.body.state && req.body.zip && req.body.username && req.body.phone && req.body.password && req.body.confirmPassword) {

    //confirm passwords match
    if (req.body.password != req.body.confirmPassword) {
      var err = new Error("Passwords do not match!");
      res.status(400);
      return next(err);
    }

    let userData = {
      name: { firstName: req.body.firstname, lastName: req.body.lastname },
      userName: req.body.username,
      userAddress: { street: req.body.street, city: req.body.city, state: req.body.state, zip: req.body.zip },
      userPhone: req.body.phone,
      userEmail: req.body.email,
      passWord: req.body.password
    };

    User.create(userData, function (err, user) {
      if (err) return next(err);
      req.session.userId = user._id;
      return res.redirect('profile');
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

      user.update(newData)
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json({ "user": req.session.userId, "updated to": req.body });
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
