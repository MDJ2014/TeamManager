var express = require('express');
var router = express.Router();

var Fee = require('../models/feeModel').Fee;
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;


/*Get payment page loaded with fees*/
router.get('/', function(req, res, next) {
    Payment.find({}, function(err,fees){
            if(err) return next(err);
            res.status(201);
            res.json(fees);
    });
  });


router.post('/', function(req,res,next){
var newPayment = new Payment(req.body);

newPayment.save(function(err,doc){
    if(err) return next(err);

    User.findById(req.body.payerId, function(err,userDoc){
        if(err) return next(err);
        userDoc.payment.push(doc._id)
        userDoc.save(function(err, savedDoc){
            if(err) return next(err);
            res.status(201);
            res.json(savedDoc);

        });
            
    });

});
});

router.delete('/cancel/:id', function(req,res,next){

/*
    
    Payment.findOneAndDelete(req.params.id, function(err,doc){
        if(err) return next(err);

        var query = User.find({});
        query.$where("this.payment == doc._id")
         .exec(function(err,userDoc){
            if(err) return next(err);
           userDoc.update({$pull:{"payment":doc._id}})
              res.status(200);
           res.json(doc);
         })

*/

    Payment.findOneAndDelete(req.params.id)
    .exec(function(err,pmtDoc){
        if(err) return next(err);

        User.find({payment: {$e: pmtDoc._id}}, function(err, userDoc){
            if(err) return next(err);

            userDoc.update({$pull:{"payment": pmtDoc._id}})

            res.status(200);
            res.json(userDoc)
        })

    });


    
 
    });
   // });


module.exports = router;