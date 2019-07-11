var express = require('express');
var router = express.Router();
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;
var Player = require('../models/playerModel').Player;
var Team = require('../models/teamModel').Team;
var mid = require('../middleware');




/* GET users listing. */
//mid.requiresAdmin
router.get('/',mid.requiresAdmin, function (req, res, next) {
  User.find({})
    .sort({ "name.lastName": 1 })
    .exec(
      function (err, users) {
        if (err) return next(err);
        res.status(200);
        res.json(users);

      });
});




/*Get registration page  */
router.get('/register', mid.loggedOut, function (req, res, next) {

  res.json({loggedIn: false});

});

/*User Login */

router.get('/login',mid.loggedOut, function (req, res, next) {
  res.status(200);
  res.json({ loggedIn: false });

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

/** ,mid.requiresLogin*/
router.get('/profile',mid.requiresLogin, function (req, res, next) {
  var profileData = {
    userData: "",
    playerData: ""

  };
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) return next(err);
      profileData.userData = user;
      Player.find({ parent: req.session.userId })
        .populate("team")

        .exec(function (err, player) {
          if (err) return next(err);
          profileData.playerData = player;
          res.status(200);
          return res.json(profileData);
        })
    })


});


/**Get Individual User */
router.get('/user', mid.requiresLogin, function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) return next(err);
      res.status(200);
      res.json(user);
     
    });
});


// router.get('/user/admin',mid.requiresMod, function(req,res,next){

//   res.status(200);
//   res.json({admin: true});

// })


router.get('/user/admin', function(req,res,next){
  User.findById(req.session.userId)
  .exec(function (err, user) {
    if(user.userType === "Admin"){
      res.json({type: "Admin"})
    }else{
      res.json({type: "Coach"})
    }




  });

});





router.get('/coaches', mid.requiresLogin, function (req, res, next) {
  User.find({ "userType": "Coach" })
    .populate("position.team")
    .exec(function (err, user) {
      if (err) return next(err);
      res.status(200);
      res.json(user);
    
    });
});



  






router.post('/login', function (req, res, next) {

  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (err, user) {
      if (err || !user) {
        var err = new Error("Wrong email or password");
        res.status(401);
        res.json({"error": "Wrong email or password"})
      
      } else {
        req.session.userId = user._id;
        req.session.userName = user.userName;

        res.json({ loggedIn: true });
      }
    });
  } else {
    var err = new Error("Email and Password are required.");
    res.status(401);
    res.json({"error": "error"})
 
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

      return res.json(user);
    });


  } else {
    var err = new Error("All fields are required.");
    res.status(400);
    return next(err);
  }

});



/** , mid.requiresLogin*/
router.put('/update', function (req, res, next) {
  var newData = req.body.userNewData;
  /**req.session.userId */
  User.findById(req.body.id)
    .exec(function (err, user) {
      if (err) return next(err);
      user.update(newData, { new: true })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);
        })
    })
});


router.put('/address', function (req, res, next) {

  /**req.session.userId */
  User.findById(req.session.userId)
    .exec(function (err, user) {
      if (err) return next(err);
      user.update({ $set: { userAddress: req.body.userAddress, userPhone: req.body.userPhone } }, { new: true })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);
        })
    })
});


router.put('/position', function (req, res, next) {


  var item = "";
  if (req.body.newData.title) {
    item = "position.title";
  } else {
    item = "position.preference"
  }

  /**req.session.userId */
  User.findById(req.body.id)
    .exec(function (err, user) {
      if (err) return next(err);
      user.update({ $set: { [item]: req.body.newData.title } })


        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);
        })
    })
});






/**Delete User mid.requiresAdmin, */
router.delete('/user/delete', function (req, res, next) {
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
