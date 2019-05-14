var express = require('express');
var router = express.Router();
var Fee = require('../models/feeModel').Fee;
var mid = require('../middleware');

router.get('/', function(req, res, next) {
    Fee.find({}, function(err,fees){
            if(err) return next(err);
            res.status(201);
            //render pay fee form
            res.json(fees);
    });
  });



router.post('/', mid.requiresAdmin, function(req,res,next){
var newFee = new Fee(req.body);
newFee.save(function(err,doc){
if(err) return next(err);
res.status(201);
res.json(doc);
});

});


router.put('/fee/:id', mid.requiresAdmin, function(req,res,next){
Fee.findOneAndUpdate(req.params.id,req.body, {"new":true})
.exec(function(err,fee){
if(err) return next(err);
res.status(201);
res.json(fee);
});
});


router.delete('/fee/:id', mid.requiresAdmin, function(req,res,next){
Fee.findOneAndDelete(req.params.id, function(err,doc){
if(err) return next(err);
res.status(200);
res.json(doc);
});
});





module.exports = router;

