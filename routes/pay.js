var express = require('express');
var router = express.Router();

var Fee = require('../models/feeModel').Fee;
var User = require('../models/userModel').User;
var Payment = require('../models/paymentModel').Payment;
var mid = require('../middleware');


/*Get payment page loaded with fees*/
router.get('/', mid.requiresLogin, function (req, res, next) {
  Payment.find({}, function (err, fees) {
    if (err) return next(err);
    res.status(201);

    res.json(fees);
  });
});


/*user's payment*/

router.get('/payment', mid.requiresAdmin, function (req, res, next) {
  Payment.find({ payerId: req.body.userId }, function (err, fees) {
    if (err) return next(err);
    res.status(201);
    res.json(fees);
  });
});






router.post('/', mid.requiresLogin, function (req, res, next) {
  var newPayment = new Payment(req.body);

  newPayment.save(function (err, doc) {
    if (err) return next(err);

    res.status(201);
    res.json(doc);

  });
});


router.put('/payment/update', mid.requiresAdmin, function (req, res, next) {
  Payment.findOneAndUpdate({ payerId: req.body.paymentId }, req.body, { new: true })
    .exec(function (err, doc) {
      if (err) return next(err);
      res.status(200);
      res.json(doc);

    });
});






router.delete('/payment/delete', mid.requiresAdmin, function (req, res, next) {


  Payment.findById(req.body.paymentId)
    .exec(function (err, pmtDoc) {
      if (err) return next(err);


      pmtDoc.delete(function (err, doc) {
        if (err) return next(err);
        res.status(200);
        res.json(pmtDoc);
      })

    })

});






module.exports = router;