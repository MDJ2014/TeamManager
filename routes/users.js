var express = require('express');
var router = express.Router();
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;
var Player = require('../models/playerModel').Player;




/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .exec(
    function(err, users)  {
      if(err) return next(err);
      res.json(users);
     
  });
  });
  
  /*Get registration page */
  router.get('/register', function(req, res, next) {
    
     res.render('register');  
    
    });

 /*Sign up new user*/   
router.post('/register', function(req,res,next){

var user = new User(req.body);

user.save(function(err,doc){
  if(err) return next(err);
 res.json(doc);
});

});


/**Get Individual User */
router.get('/user/:id', function(req,res,next){
User.findById(req.params.id)
//.populate('payment').populate('players')
.exec(function(err,user){
  if(err) return next(err);
  res.status(201);
  res.json(user);
});
});


/**Delete User */
router.delete('/user/:id', function(req,res,next){
  User.findByIdAndDelete(req.params.id, function(err,deletedDoc){
      if(err) return next(err);
      Player.deleteMany({parent: req.params.id}, function(err,playerDocs){
        if(err) return next(err);
        res.status(200);
      res.json(deletedDoc);
      })

      
  })
})





/*Make a payment*/
/*
router.put('/user/:id/payment', function(req,res,next){

var newPayment = new Payment(req.body);


newPayment.save(function(err,pmnt){
  if(err) return next(err);

User.findById(req.params.id, function(err,user){
if(err) return next(err);
user.payment.push(pmnt._id);
user.save(function(err,doc){
    if(err) return next(err);
      res.status(201);
      res.json(doc);
});  
});
});
});
*/


  
    
    
     
    
 




module.exports = router;
