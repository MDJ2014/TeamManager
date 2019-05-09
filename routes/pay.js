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
        userDoc.payment = doc._id
        userDoc.save(function(err, savedDoc){
            if(err) return next(err);
            res.status(201);
            res.json(savedDoc);

        });
            
    });

});
});


module.exports = router;